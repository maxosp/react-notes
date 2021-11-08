import { Note } from "."
import { promiseWithDebounce } from "./lib"

export type GetNotesListParams = {
  text: string
  tags: string[]
}

export type CreateNoteParams = {
  text: string
  tags: string[]
  pinned: boolean
}

const notesList = (params: GetNotesListParams): Note[] => {
  const username = localStorage.getItem('currentUser')!
  const data = JSON.parse(localStorage.getItem(username) || '')

  if (!params.text && !params.tags) return data.notes
  
  const { text, tags } = params
  const filteredData = data.notes.filter((note: Note) => {
    const hasText = text ? !!note.text.includes(text) : true
    const hasTags = (tags && note.tags) ? tags.every(tag => note.tags.includes(tag)) : true
    return hasText && hasTags
  })
  
  return filteredData
}

const createN = (note: CreateNoteParams): boolean => {
  const username = localStorage.getItem('currentUser')!
  const data = JSON.parse(localStorage.getItem(username) || '')

  data.notes.push({ id: data.notes.length, text: note.text, tags: note.tags, pinned: false })
  localStorage.setItem(username, JSON.stringify(data))

  return true
}

const getN = (id: number): Note => {
  const username = localStorage.getItem('currentUser')!
  const data = JSON.parse(localStorage.getItem(username) || '')

  return data.notes.find((note: Note) => note.id === id)
}

const updateN = (note: Note): boolean => {
  const username = localStorage.getItem('currentUser')!
  const data = JSON.parse(localStorage.getItem(username) || '')

  data.notes[note.id] = note
  localStorage.setItem(username, JSON.stringify(data))

  return true
}

const deleteN = (id: number): boolean => {
  const username = localStorage.getItem('currentUser')!
  const data = JSON.parse(localStorage.getItem(username) || '')

  data.notes.splice(id, 1)
  localStorage.setItem(username, JSON.stringify(data))

  return true
}

export const getNotesList = (params: GetNotesListParams) => promiseWithDebounce<Note[]>(notesList(params))

export const createNote = (note: CreateNoteParams) => promiseWithDebounce<boolean>(createN(note))

export const getNote = (id: number) => promiseWithDebounce<Note>(getN(id))

export const updateNote = (note: Note) => promiseWithDebounce<boolean>(updateN(note))

export const deleteNote = (id: number) => promiseWithDebounce<boolean>(deleteN(id))
