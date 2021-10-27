import { useEffect } from "react"
import { Link } from "react-router-dom"
import { list } from "@effector/reflect"
import { Layout, Row, Col, Typography, Button, Space } from "antd"

import { noteModel, NoteRow } from "entities/note"
import { NotesFilters } from "features/notes-filters/filter-by-text"
import { TagsFilter } from 'features/notes-filters/filter-by-tags'
import { NotePin } from 'features/note-pin/index'
import { NoteDelete } from "features/note-delete"
import { useStore } from "effector-react"
import styles from "./styles.module.scss"

const NotesListPage = () => {
  const tags = useStore(noteModel.$tagsFilterConfig)

  useEffect(() => {
    noteModel.getNotes()
  }, [])

  return (
    <Layout className={styles.root}>
      <Layout className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Notes</Typography.Title>
        </Row>
        <Row justify="center">
          <Button>
            <Link to={'/create'}>Create Note</Link>
          </Button>
        </Row>
        <Row justify="center" className={styles.top}>
          <Space direction="vertical">
            <NotesFilters />
            <TagsFilter
              tags={tags}
              onClose={(tag: string) => {
                noteModel.deleteTagFromFilter(tag)
              }}
            />
          </Space>
        </Row>
      </Layout>
      <Layout.Content className={styles.content}>
        <Row gutter={[0, 20]} justify="center">
          <Col className={styles.column}>
            <NotesList />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

const NotesList = list({
  view: NoteRow,
  source: noteModel.$notesList,
  bind: {},
  mapItem: {
    text: (note) => note.text,
    textHref: (note) => `/edit/${note.id}`,
    tags: (note) => note.tags,
    onClick: (note) => () => {
      noteModel.setNoteId(note.id)
      noteModel.getNoteFx(note.id)
    },
    actions: (note) => {
      return (
        <div className={styles.actions}>
          <NoteDelete onClick={() => noteModel.deleteNote(note.id)} />
          <NotePin checked={note.pinned} onClick={() => noteModel.togglePinned(note.id)} />
        </div>
      )
    },
  },
  getKey: (note) => note.id || 0,
})

export default NotesListPage