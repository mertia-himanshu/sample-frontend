import React, { useEffect, useState } from 'react'
import { useUsername } from '../hooks/useAuth'
import { displayGreeting } from './GreetUser'

export const Welcome = (): JSX.Element => {
  const [username, setUsername] = useState<string | undefined>(undefined)
  const user = useUsername()

  useEffect(() => {
    setUsername(user)
  }, [user])

  return <>{displayGreeting(`Welcome ${username ? username : 'Guest'} !!!`)}</>
}
