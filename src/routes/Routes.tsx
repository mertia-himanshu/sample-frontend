import React, { useEffect } from 'react'
import { Route, RouteProps, Switch } from 'react-router-dom'
import { GreetUser, AdminGreetUser } from '../components/GreetUser'
import NotFound from '../components/NotFound'
import { Welcome } from '../components/Welcome'
import { useAuth } from '../hooks/Hooks'

const ProtectedRoute = (routeProps: RouteProps) => {
  const { auth } = useAuth()
  if (!auth) return <div>Loading</div>
  const isAuthenticated = auth?.isAuthenticated() ?? false
  return isAuthenticated ? <Route {...routeProps} /> : <RedirectToLogin />
}

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route path='/greeting' component={GreetUser} />
      <ProtectedRoute path='/adminGreeting' component={AdminGreetUser} />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}

const RedirectToLogin = () => {
  const { login } = useAuth()

  useEffect(login, [login])

  return <div>Loading...</div>
}
