import { Row, Typography, Button, Input, Space } from "antd"
import { useStore } from "effector-react"

import { noteModel } from "entities/note"
import styles from "./styles.module.scss"

const { TextArea } = Input

export const NoteCard = () => {
  return (
    <Row>
      <Row className={styles.input} gutter={[0, 20]} justify="start">
        <Typography.Title level={3}>Add Tags</Typography.Title>
        <Space direction="horizontal">
          <Input placeholder="Enter tag name"/>
          <Button onClick={() => {}}>Add tag</Button>
        </Space>
      </Row>
      <Row className={styles.input} gutter={[0, 20]} justify="start">
        <Typography.Title level={3}>Add Text</Typography.Title>
        <TextArea
          value={useStore(noteModel.$text)}
          onChange={({ target: { value } }) => noteModel.setText(value)}
          rows={8}
          placeholder="Enter text"
        />
      </Row>
    </Row>
  )
}