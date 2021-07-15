import { Typography } from 'antd'
import React, { useState } from 'react'
import { useLocationService } from '../../contexts/LocationServiceContext'
import { useAuth } from '../../hooks/useAuth'
import type { UserInfoRequest } from '../../models/Models'
import { fetchAdminGreeting, fetchGreeting } from '../../utils/api'
import { errorMessage } from '../../utils/message'
import { getBackendUrl } from '../../utils/resolveBackend'
import { UserForm } from '../form/UserForm'

export const GreetUser = (): JSX.Element => {
  const [greeting, setGreeting] = useState<string>()

  const locationService = useLocationService()

  const onFinish = async (values: UserInfoRequest) => {
    const backendUrl = await getBackendUrl(locationService)

    if (backendUrl) {
      const response = await fetchGreeting(backendUrl, values)
      setGreeting(response.greeting)
    }
  }

  return (
    <>
      <UserForm onFinish={onFinish} />
      {greeting && displayGreeting(greeting)}
    </>
  )
}

export const AdminGreetUser = (): JSX.Element => {
  const { auth } = useAuth()

  const [greeting, setGreeting] = useState<string>()

  const locationService = useLocationService()

  const onFinish = async (values: UserInfoRequest) => {
    const backendUrl = await getBackendUrl(locationService)

    if (backendUrl) {
      const token = auth?.token()
      if (!token) {
        errorMessage('Failed to greet user: Unauthenticated request')
      } else {
        const response = await fetchAdminGreeting(backendUrl, values, token)
        setGreeting(response.greeting)
      }
    }
  }

  return (
    <>
      <UserForm onFinish={onFinish} />
      {greeting && displayGreeting(greeting)}
    </>
  )
}

export const displayGreeting = (greeting: string): JSX.Element => (
  <Typography.Title level={3}>{greeting}</Typography.Title>
)
