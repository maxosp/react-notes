import { MouseEventHandler, PropsWithChildren } from "react"
import { PushpinOutlined, PushpinFilled } from '@ant-design/icons'

export type NotePinProps = PropsWithChildren<{
  checked: boolean
  onClick: MouseEventHandler
}>

export const NotePin = ({ checked, onClick }: NotePinProps) => {
  const icon = checked
    ? <PushpinFilled onClick={onClick} />
    : <PushpinOutlined onClick={onClick} />
  return icon
}