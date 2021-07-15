import { Typography } from 'antd'
import React, { useState } from 'react'
import { useLocationService } from '../../contexts/LocationServiceContext'
import type { UserInfoRequest } from '../../models/Models'
import { fetchGreeting } from '../../utils/api'
import { getBackendUrl } from '../../utils/resolveBackend'
import { UserForm } from '../form/UserForm'

export const Greeting = (): JSX.Element => {
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

export const displayGreeting = (greeting: string): JSX.Element => (
  <Typography.Title level={3}>{greeting}</Typography.Title>
)
