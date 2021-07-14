import type { LocationService } from '@tmtsoftware/esw-ts'
import { Layout, Typography } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import { useLocationService } from '../contexts/LocationServiceContext'
import { useAuth } from '../hooks/Hooks'
import { UserForm } from './form/UserForm'
import styles from './GreetUser.module.css'
import { fetchAdminGreeting, fetchGreeting } from './helpers/api'
import { errorMessage } from './helpers/message'
import { BACKEND_CONNECTION, resolveBackendUrl } from './helpers/resolveBackend'
import type { UserInfoRequest } from './models/Models'

const getBackendUrl = async (locationService: LocationService) => {
  try {
    const backendLocation = await resolveBackendUrl(locationService)
    if (backendLocation === undefined) {
      errorMessage(
        `Backend Server connection ${BACKEND_CONNECTION} not available`
      )
    }
    return backendLocation
  } catch (e) {
    errorMessage('Failed to resolve backend Url', e)
    return
  }
}

export const GreetUser = (): JSX.Element => {
  const [greeting, setGreeting] = useState<string>()

  const locationService = useLocationService()

  const onFinish = async (values: UserInfoRequest) => {
    const backendLocation = await getBackendUrl(locationService)

    if (backendLocation) {
      const response = await fetchGreeting(backendLocation.uri, values)
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

export const AdminGreetUser = (): JSX.Element => {
  const { auth } = useAuth()

  const [greeting, setGreeting] = useState<string>()

  const locationService = useLocationService()

  const onFinish = async (values: UserInfoRequest) => {
    const backendLocation = await getBackendUrl(locationService)

    if (backendLocation) {
      const token = auth?.token()
      if (!token) {
        errorMessage('Failed to greet user: Unauthenticated request')
      } else {
        const response = await fetchAdminGreeting(
          backendLocation.uri,
          values,
          token
        )
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
