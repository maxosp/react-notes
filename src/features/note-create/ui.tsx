import { Button, Space } from "antd"

import { noteModel } from "entities/note"
import { NoteCard } from 'entities/note/ui/note-card'

export const NoteCreate = () => {
  return (
    <Space direction="vertical">
      <NoteCard />
      <Button onClick={() => noteModel.createNote()}>Create note</Button>
    </Space>
  )
}