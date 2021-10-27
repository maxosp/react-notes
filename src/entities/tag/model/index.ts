import { createStore, combine, createEffect, createEvent } from "effector"

// Types

type Tag = {
  id: number
  name: string
}

// API effects

// Stores & events

const $tagsList = createStore<Tag[]>([])

const addTag = createEvent<void>()

const deleteTag = createEvent<void>()

// Effects
