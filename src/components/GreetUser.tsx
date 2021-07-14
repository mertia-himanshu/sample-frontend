import type { Auth } from '@tmtsoftware/esw-ts'
import { Layout, Typography } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import UserForm from './form/UserForm'
import styles from './GreetUser.module.css'

export const GreetUser = ({
  isSecured = false,
  auth
}: {
  isSecured?: boolean
  auth?: Auth | null
}): JSX.Element => {
  const [displayMessage, setDisplayMessage] = useState('')
  const path = isSecured ? 'securedSayHello' : 'sayHello'
  const authHeader = isSecured
    ? { Authorization: `Bearer ${auth?.token()}` }
    : undefined

  const onSubmitHandler = (message: string) => {
    setDisplayMessage(message)
  }
  const showMessage = displayMessage.length > 0

  return (
    <Layout>
      <Content className={styles.content}>
        <UserForm
          onSubmitHandler={onSubmitHandler}
          path={path}
          authHeader={authHeader}
        />
        {showMessage && <Typography.Text>{displayMessage}</Typography.Text>}
      </Content>
    </Layout>
  )
}
