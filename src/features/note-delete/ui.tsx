import { DeleteOutlined } from '@ant-design/icons'
import { MouseEventHandler, PropsWithChildren } from 'react'

export type NoteDeleteProps = PropsWithChildren<{
  onClick: MouseEventHandler
}>

export const NoteDelete = ({ onClick }: NoteDeleteProps) => {
  return <DeleteOutlined onClick={onClick} />
}