import React from 'react'
import { Route, RouteProps, Switch } from 'react-router-dom'
import { useAuth } from 'src/components/contexts/LocationServiceContext'
import LoginError from '../components/error/LoginError'
import { GreetUser, GreetUserSecured } from '../components/GreetUser'
import NotFound from '../components/NotFound'
import Welcome from '../components/Welcome'

type ProtectedRouteProps = { fallback: JSX.Element } & RouteProps

const ProtectedRoute = ({ fallback, ...routeProps }: ProtectedRouteProps) => {
  const { auth } = useAuth()
  const isAuthenticated = auth?.isAuthenticated() ?? false
  return isAuthenticated ? <Route {...routeProps} /> : fallback
}

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route path='/greet' component={GreetUser} />
      <ProtectedRoute
        path='/securedGreet'
        component={GreetUserSecured}
        fallback={<LoginError />}
      />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}
