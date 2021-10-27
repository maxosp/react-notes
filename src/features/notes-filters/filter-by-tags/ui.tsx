import { TagElement } from "features/add-tag"
import { PropsWithChildren } from "react"
import styles from './styles.module.scss'

export type TagsFilterProps = PropsWithChildren<{
  tags: string[]
  onClose?: any
}>

export const TagsFilter = ({ tags, onClose }: TagsFilterProps) => {
  return (
    <div className={styles.tags}>
      {
        tags ? tags.map((tag, id) => (
          <TagElement
            key={id}
            name={tag}
            closable={true}
            onClose={onClose}
          />
        )) : `Select tags to filter`
      }
    </div>
  )
}