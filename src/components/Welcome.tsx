import Title from 'antd/lib/typography/Title'
import React, { useEffect, useState } from 'react'
import { useUserName as useUsername } from './contexts/LocationServiceContext'

const Welcome = (): JSX.Element => {
  const [username, setUsername] = useState<string | undefined>(undefined)
  const user = useUsername()

  useEffect(() => {
    setUsername(user)
  }, [user])

  return (
    <Title style={{ marginTop: 8 }} level={4}>
      Welcome {username ? username : 'Guest'} !!!{' '}
    </Title>
  )
}

export default Welcome
