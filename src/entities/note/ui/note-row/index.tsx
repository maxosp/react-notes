import type { MouseEventHandler, PropsWithChildren, ReactNode } from "react"
import { Row } from "antd"
import { Link } from "react-router-dom"
import { TagElement } from "features/add-tag"
import { noteModel } from "entities/note"
import styles from "./styles.module.scss"

export type NoteRowProps = PropsWithChildren<{
    actions?: ReactNode
    textHref?: string
    tags: string[]
    text: string
    onClick?: MouseEventHandler
}>

export const NoteRow = ({ actions, textHref, text, tags, onClick }: NoteRowProps) => {
    const link = textHref ? <Link to={ textHref }>{ text }</Link> : text

    return (
        <Row justify="space-between" className={styles.root} onClick={onClick}>
            <div className={styles['note-text']}>
                { link }
            </div>
            <div className={styles.tags}>
                { tags && tags.map((tag, id) => (
                    <TagElement
                      key={id}
                      name={tag}
                      closable={false}
                      onClick={() => noteModel.toggleTagToFilter(tag)}
                    />
                )) }
            </div>            
            { actions && <div className={styles.actions}>{actions}</div> }
        </Row>
    )
}