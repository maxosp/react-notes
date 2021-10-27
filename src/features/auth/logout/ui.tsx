import { Avatar, Button, Space } from "antd"
import { authModel } from "entities/user"
import { useStore } from "effector-react"
import { useEffect } from "react"

export const Logout = () => {
  useEffect(() => authModel.getUser())
  const username = useStore(authModel.$currentUser)

  return (
    <Space>
      <Avatar>{username?.charAt(0).toUpperCase()}</Avatar>
      <Button
        disabled={!username}
        onClick={() => authModel.logout()}
      >
        Logout
      </Button>
    </Space>
  )
}