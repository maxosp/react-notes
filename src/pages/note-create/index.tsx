import { Layout, Row, Typography, Button, Space } from "antd"
import { noteModel } from "entities/note"

import { NoteCreate } from 'features/note-create'
import { useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./styles.module.scss"

const NoteCreatePage = () => {
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
          <Space>
            <Typography.Title level={1}>Create Note</Typography.Title>
          </Space>
        </Row>
      </Layout>
      <Layout.Content className={styles.content}>
        <NoteCreate />
      </Layout.Content>
    </Layout>
  )
}

export default NoteCreatePage