import {
  AuthContext,
  AuthContextType,
  LocationService
} from '@tmtsoftware/esw-ts'
import React, { createContext, PropsWithChildren, useContext } from 'react'

const LocationServiceContext = createContext<LocationService | undefined>(
  undefined
)

export const LocationServiceProvider = ({
  children,
  locationService
}: PropsWithChildren<{ locationService: LocationService }>): JSX.Element => (
  <LocationServiceContext.Provider value={locationService}>
    {children}
  </LocationServiceContext.Provider>
)

export const useLocationService = (): LocationService => {
  const c = useContext(LocationServiceContext)
  if (!c)
    throw new Error(
      'useLocationService must be inside a LocationServiceProvider with a value'
    )
  return c
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx)
    throw new Error('useAuth must be inside a AuthContextProvider with a value')
  return ctx
}

export const useUserName = (): string | undefined => {
  const { auth } = useAuth()
  return auth?.tokenParsed()?.preferred_username
}
