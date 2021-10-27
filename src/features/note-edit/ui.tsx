import { Button, Space } from "antd"

import { noteModel } from "entities/note"
import { NoteCard } from 'entities/note/ui/note-card'

export const NoteEdit = () => {
  return (
    <Space direction="vertical">
      <NoteCard />
      <Button onClick={() => noteModel.updateNote()}>Update note</Button>
    </Space>
  )
}