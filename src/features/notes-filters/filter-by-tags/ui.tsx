import { TagElement } from "features/add-tag"
import { PropsWithChildren } from "react"
import styles from './styles.module.scss'

export type TagsFilterProps = PropsWithChildren<{
  tags: string[]
  onClick?: any
}>

export const TagsFilter = ({ tags, onClick }: TagsFilterProps) => {
  return (
    <div className={styles.tags}>
      {
        tags.length ? tags.map((tag, id) => (
          <TagElement
            key={id}
            name={tag}
            closable={false}
            onClick={() => onClick(tag)}
          />
        )) : `Select tags to filter`
      }
    </div>
  )
}