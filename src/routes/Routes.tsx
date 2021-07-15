import React, { useEffect } from 'react'
import { Route, RouteProps, Switch } from 'react-router-dom'
import { NotFound } from '../components/error/NotFound'
import { AdminGreeting } from '../components/pages/AdminGreeting'
import { Greeting } from '../components/pages/Greeting'
import { Welcome } from '../components/pages/Welcome'
import { useAuth } from '../hooks/useAuth'

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route path='/greeting' component={Greeting} />
      <ProtectedRoute path='/adminGreeting' component={AdminGreeting} />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}

const ProtectedRoute = (routeProps: RouteProps) => {
  const { auth } = useAuth()
  if (!auth) return <div>Loading</div>
  const isAuthenticated = auth?.isAuthenticated() ?? false
  return isAuthenticated ? <Route {...routeProps} /> : <RedirectToLogin />
}

const RedirectToLogin = () => {
  const { login } = useAuth()

  useEffect(login, [login])

  return <div>Loading...</div>
}
