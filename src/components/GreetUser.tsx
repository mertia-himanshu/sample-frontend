import { Layout, Typography } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import UserForm from './form/UserForm'
import styles from './GreetUser.module.css'

export const GreetUser = ({
  isSecured = false
}: {
  isSecured?: boolean
}): JSX.Element => {
  const [displayMessage, setDisplayMessage] = useState('')
  const onSubmitHandler = (message: string) => {
    setDisplayMessage(message)
  }
  const showMessage = displayMessage.length > 0

  return (
    <Layout>
      <Content className={styles.content}>
        <UserForm onSubmitHandler={onSubmitHandler} isSecured={isSecured} />
        {showMessage && <Typography.Text>{displayMessage}</Typography.Text>}
      </Content>
    </Layout>
  )
}
