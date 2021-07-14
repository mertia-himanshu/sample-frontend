import { AuthContext } from '@tmtsoftware/esw-ts'
import React, { useContext } from 'react'
import { Route, RouteProps, Switch } from 'react-router-dom'
import LoginError from '../components/error/LoginError'
import { GreetUser } from '../components/GreetUser'
import NotFound from '../components/NotFound'
import Welcome from '../components/Welcome'

type ProtectedRouteProps = {
  authenticated: boolean
  fallback: JSX.Element
} & RouteProps

const ProtectedRoute = ({
  authenticated,
  fallback,
  ...routeProps
}: ProtectedRouteProps) => {
  if (authenticated) {
    return <Route {...routeProps} />
  } else {
    return fallback
  }
}

export const Routes = (): JSX.Element => {
  const { auth } = useContext(AuthContext)

  return (
    <Switch>
      <Route exact path='/' component={() => <Welcome />} />
      <Route path='/greet' component={() => <GreetUser />} />
      <ProtectedRoute
        authenticated={auth?.isAuthenticated() ?? false}
        path='/securedGreet'
        component={() => <GreetUser isSecured auth={auth} />}
        fallback={<LoginError />}
      />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}
