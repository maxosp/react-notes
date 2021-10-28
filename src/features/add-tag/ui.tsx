import { Tag } from "antd"
import { MouseEventHandler, PropsWithChildren } from "react"
import styles from './styles.module.scss'

export type TagElementProps = PropsWithChildren<{
  name: string
  closable: boolean
  onClick?: MouseEventHandler
}>

export const TagElement = ({ name, closable, onClick }: TagElementProps) => {
  return (
    <Tag
      className={styles['ant-tag']}
      closable={closable}
      onClick={onClick}
    >
      { name }
    </Tag>
  )
}