import { AuthContext } from '@tmtsoftware/esw-ts'
import Title from 'antd/lib/typography/Title'
import React, { useContext, useEffect, useState } from 'react'

const Welcome = (): JSX.Element => {
  const { auth } = useContext(AuthContext)
  const [username, setUsername] = useState<string | undefined>(undefined)

  useEffect(() => {
    setUsername(auth?.tokenParsed()?.preferred_username)
  }, [auth])

  return (
    <Title style={{ marginTop: 8 }} level={4}>
      Welcome {username ? username : 'Guest'} !!!{' '}
    </Title>
  )
}

export default Welcome
