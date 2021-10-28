import { list } from "@effector/reflect"
import { Row, Typography, Button, Input, Space } from "antd"
import { useStore } from "effector-react"

import { noteModel } from "entities/note"
import { TagElement } from "features/add-tag"
import styles from "./styles.module.scss"

const { TextArea } = Input

export const NoteCard = () => {
  return (
    <Space className={styles.content} direction="vertical">
      <Row className={styles.input} gutter={[0, 20]} justify="start">
        <Typography.Title level={3}>Add Tags</Typography.Title>
        <Row className={styles.tags}>
          <TagsList />
        </Row>        
        <Input
          value={useStore(noteModel.$tag)}
          onChange={({ target: { value } }) => noteModel.setTag(value)}
          placeholder="Enter tag name"
        />
        <Button onClick={() => noteModel.createTag()}>Add tag</Button>
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
    </Space>
  )
}

const TagsList = list({
  view: TagElement,
  source: noteModel.$tags,
  bind: {},
  mapItem: {
    name: (tag) => tag,
    closable: () => true,
    onClick: (tag) => () => noteModel.toggleTagToFilter(tag),
  },
  getKey: (tag) => tag,
})