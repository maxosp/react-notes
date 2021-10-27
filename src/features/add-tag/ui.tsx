import { Tag } from "antd"
import { MouseEventHandler, PropsWithChildren } from "react"
import styles from './styles.module.scss'

export type TagElementProps = PropsWithChildren<{
  name: string
  closable: boolean
  onClose?: MouseEventHandler
  onClick?: MouseEventHandler
}>

export const TagElement = ({ name, closable, onClose, onClick }: TagElementProps) => {
  return (
    <Tag
      className={styles['ant-tag']}
      closable={closable}
      onClose={onClose}
      onClick={onClick}
    >
      { name }
    </Tag>
  )
}