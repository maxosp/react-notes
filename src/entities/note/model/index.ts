import { createStore, createEffect, createEvent, restore, guard, sample, combine, forward } from "effector"
import { condition, debounce, spread } from "patronum"
import { apiInstance } from "shared/api"
import { CreateNoteParams, GetNotesListParams } from "shared/api/notes"

// Types

export type QueryConfig = {
  text: string
  tags: string[]
}

type Note = {
  id: number
  text: string
  tags: string[]
  pinned: boolean
}

// API effects

export const getNotesListFx = createEffect({
  handler(params: GetNotesListParams) {
    return apiInstance.notes.getNotesList(params)
  }
})

export const getNoteFx = createEffect({
  handler(id: number) {
    return apiInstance.notes.getNote(id)
  }
})

export const createNoteFx = createEffect({
  handler(note: CreateNoteParams) {
    return apiInstance.notes.createNote(note)
  }
})

export const updateNoteFx = createEffect({
  handler(note: Note) {
    return apiInstance.notes.updateNote(note)
  }
})

export const deleteNoteFx = createEffect({
  handler(id: number) {
    return apiInstance.notes.deleteNote(id)
  }
})

// Stores, events

export const setQueryConfig = createEvent<string>()
export const setTagToFilter = createEvent<string>()
export const deleteTagFromFilter = createEvent<string>()

export const $queryConfig = createStore<QueryConfig>({ text: '', tags: [] })
  .on(setQueryConfig, (state, payload) => ({ ...state, text: payload }))
  .on(setTagToFilter, (state, tag) => {
    let tagsFilter = state.tags
    if (!tagsFilter) {
      tagsFilter = [tag]
    } else if (tagsFilter.indexOf(tag) === -1) {
      tagsFilter.push(tag)
    }
    return {
      ...state,
      tags: tagsFilter,
    }
  })
  .on(deleteTagFromFilter, (state, tag) => {
    const tagId = state.tags.indexOf(tag)
    state.tags.splice(tagId, 1)
    return {
      ...state,
      tags: state.tags,
    }
  })

export const $tagsFilterConfig = combine($queryConfig, (filter) => {
  return filter.tags
})

export const createNote = createEvent<void>()

export const updateNote = createEvent<void>()

export const deleteNote = createEvent<number>()

export const getNotes = createEvent<void>()

export const togglePinned = createEvent<number>()
export const $pinned = createStore(false)
  .on(togglePinned, (state) => !state)

export const resetFields = createEvent<void>()

export const $notesList = createStore<Note[]>([])
  .on(getNotesListFx.doneData, (_, notes) => notes.sort((x, y) => {
    return (x.pinned === y.pinned) ? 0 : x.pinned ? -1 : 1
  }))
  .reset(resetFields)

export const setNoteId = createEvent<number>()
export const $noteId = restore(setNoteId, -1).reset(resetFields)

export const setText = createEvent<string>()
export const $text = restore(setText, '').reset(resetFields)

export const createTag = createEvent<void>()
export const deleteTag = createEvent<string>()
export const $tags = createStore<string[]>([]).reset(resetFields)

export const setTag = createEvent<string>()
export const $tag = restore(setTag, '')

sample({
  clock: createTag,
  source: {
    all: $tags,
    new: $tag,
  },
  fn: (payload) => [...payload.all, payload.new],
  target: $tags,
})

sample({
  clock: deleteTag,
  source: $tags,
  fn: (tags, toDelete) => {
    const idToDelete = tags.indexOf(toDelete)
    tags.splice(idToDelete, 1)
    return tags
  },
  target: $tags,
})

forward({
  from: $tags,
  to: setTag.prepend(() => ''),
})

const $currNote = combine(
  $noteId,
  $text,
  $tags,
  $pinned,
  (id, text, tags, pinned): Note => ({
    id,
    text,
    tags: tags || undefined,
    pinned,
  })
)

// Effects

const debounced = debounce({
  source: $queryConfig,
  timeout: 150,
})

sample({
  clock: debounced,
  target: condition({
    if: (params: QueryConfig) => !!params.text === true || !!params.tags === true,
    then: getNotesListFx.prepend((params: QueryConfig) => params),
    else: getNotesListFx.prepend(() => ({ text: '', tags: [] })),
  }),
})

sample({
  clock: getNotes,
  source: $queryConfig,
  target: getNotesListFx,
})

sample({
  clock: createNote,
  source: combine(
    $text,
    $pinned,
    $tags,
    (text, pinned, tags) => ({ text, pinned, tags })),
  target: createNoteFx,
})

guard({
  clock: updateNote,
  source: $currNote,
  filter: (note) => {
    return note.id !== null
  },
  target: updateNoteFx,
})

guard({
  clock: deleteNote,
  filter: (id) => id !== null,
  target: deleteNoteFx,
})

sample({
  clock: deleteNoteFx.doneData,
  source: $queryConfig,
  target: getNotesListFx,
})

spread({
  source: getNoteFx.doneData,
  targets: {
    id: $noteId,
    text: $text,
    tags: $tags,
  },
})

sample({
  clock: togglePinned,
  source: $notesList,
  fn: (notes, id): Note => {
    const toggledNote = notes.find(note => note.id === id)!
    return {
      ...toggledNote,
      pinned: !toggledNote.pinned
    }
  },
  target: updateNoteFx,
})

sample({
  clock: updateNoteFx.doneData,
  source: $queryConfig,
  target: getNotesListFx,
})
