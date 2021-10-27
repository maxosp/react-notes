import { Layout, Row, Typography, Input, Button } from "antd"

import styles from "./styles.module.scss"
import { authModel } from "entities/user"
import { useStore } from "../../../node_modules/effector-react"

const AuthPage = () => {
  const name = useStore(authModel.$username)
  return (
    <Layout className={styles.root}>
      <Layout className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Notes App</Typography.Title>
        </Row>
        <Row justify="center" className={styles.input}>
          <Input
            placeholder="Enter username"
            onChange={({ target: { value } }) => authModel.setUsername(value)}
          />
        </Row>
        <Row justify="center">
          <Button onClick={() => authModel.login()} disabled={!name.length}>Sign in</Button>
        </Row>
      </Layout>
    </Layout>
  )
}

export default AuthPage
