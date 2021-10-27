import * as notes from './notes'
import * as auth from './auth'

export type Note = {
  id: number
  text: string
  tags: string[]
  pinned: boolean
}

export const apiInstance = {
  notes,
  auth,
}