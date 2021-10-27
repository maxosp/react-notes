import { Row, Typography } from 'antd'
import { Logout } from 'features/auth/logout'
import styles from './styles.module.scss'

export const Header = () => {
  return (
    <Row justify='space-between' className={styles.header}>
      <Typography.Title level={3} className={styles.logo}>Notes App</Typography.Title>
      <Logout />
    </Row>
  )
}