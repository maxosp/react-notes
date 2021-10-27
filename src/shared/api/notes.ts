import { Note } from "."

const DELAY = 500

export type GetNotesListParams = {
  text: string
  tags: string[]
};

export const getNotesList = (params: GetNotesListParams): Promise<Note[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const username = localStorage.getItem('currentUser')!
        const data = JSON.parse(localStorage.getItem(username) || '')
        

        if (!params.text && !params.tags) resolve(data.notes)
        else {
          const { text, tags } = params
          const filteredData = data.notes.filter((note: Note) => {
            const hasText = text ? !!note.text.includes(text) : true
            const hasTags = (tags && note.tags) ? tags.every(tag => note.tags.includes(tag)) : true
            return hasText && hasTags
          })
          
          resolve(filteredData)
        }
      }, DELAY)
    })
}

export type CreateNoteParams = {
  text: string
  tags: string[]
  pinned: boolean
}

export const createNote = (note: CreateNoteParams): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const username = localStorage.getItem('currentUser')!
      const data = JSON.parse(localStorage.getItem(username) || '')
      data.notes.push({ id: data.notes.length, text: note.text, tags: note.tags, pinned: false })
      localStorage.setItem(username, JSON.stringify(data))
      resolve(true)
    }, DELAY)
  })
}

export const getNote = (id: number): Promise<Note> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const username = localStorage.getItem('currentUser')!
      const data = JSON.parse(localStorage.getItem(username) || '')
      resolve(data.notes.find((note: Note) => note.id === id))
    }, DELAY)
  })
}

export const updateNote = (note: Note): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const username = localStorage.getItem('currentUser')!
      const data = JSON.parse(localStorage.getItem(username) || '')
      data.notes[note.id] = note
      localStorage.setItem(username, JSON.stringify(data))
      resolve(true)
    }, DELAY)
  })
}

export const deleteNote = (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const username = localStorage.getItem('currentUser')!
      const data = JSON.parse(localStorage.getItem(username) || '')
      data.notes.splice(id, 1)
      localStorage.setItem(username, JSON.stringify(data))
      resolve(true)
    }, DELAY)
  })
}
