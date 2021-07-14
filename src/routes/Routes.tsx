import { CheckLogin } from '@tmtsoftware/esw-ts'
import { Result } from 'antd'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginError from '../components/error/LoginError'
import { GreetUser } from '../components/GreetUser'
import Welcome from '../components/Welcome'

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/'>
        <Welcome />
      </Route>
      <Route path='/greet'>
        <GreetUser />
      </Route>
      <Route path='/securedGreet'>
        <CheckLogin error={<LoginError />}>
          <GreetUser isSecured />
        </CheckLogin>
      </Route>
      <Route
        path='*'
        component={() => (
          <Result
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
          />
        )}
      />
    </Switch>
  )
}
