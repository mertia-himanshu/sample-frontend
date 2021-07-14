import { Layout, Typography } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import { useAuth } from './contexts/LocationServiceContext'
import UserForm from './form/UserForm'
import styles from './GreetUser.module.css'
type AuthHeader = {
  Authorization: string
}
export const GreetUser = (): JSX.Element => {
  return <GreetUser0 path='sayHello' />
}

export const GreetUserSecured = (): JSX.Element => {
  const { auth } = useAuth()
  const authHeader = { Authorization: `Bearer ${auth?.token()}` }

  return <GreetUser0 path='securedSayHello' authHeader={authHeader} />
}

const GreetUser0 = ({
  path,
  authHeader
}: {
  path: string
  authHeader?: AuthHeader
}): JSX.Element => {
  const [displayMessage, setDisplayMessage] = useState('')

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
