import { Button, Layout, Row, Typography } from "antd"
import { noteModel } from "entities/note"

import { NoteEdit } from "features/note-edit"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./styles.module.scss"

const NoteEditPage = () => {
  useEffect(() => () => noteModel.resetFields(), [])

  return (
    <Layout className={styles.root}>
      <Layout className={styles.toolbar}>
        <Row className={styles.column} justify="end">
          <Link to={'/'}>
            <Button>Back to List</Button>
          </Link>
        </Row>
        <Row justify="center">
          <Typography.Title level={1}>Edit Note</Typography.Title>          
        </Row>
      </Layout>
      <Layout.Content className={styles.content}>
        <NoteEdit />
      </Layout.Content>
    </Layout>
  )
}

export default NoteEditPage