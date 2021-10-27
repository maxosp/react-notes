import { Row, Input, Space } from "antd"
import { noteModel } from "entities/note"

export const NotesFilters = () => {
  return (
    <Row justify="center">
      <Space>
        <Input
          placeholder="Enter search string"
          onChange={({ target: { value } }) => noteModel.setQueryConfig(value)}
        />
      </Space>
    </Row>
  )
}
