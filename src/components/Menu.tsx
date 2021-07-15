import { Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Login = ({ login }: { login: () => void }): JSX.Element => (
  <Menu.Item key='login' onClick={login}>
    Login
  </Menu.Item>
)

export const Logout = ({ logout }: { logout: () => void }): JSX.Element => (
  <Menu.Item key='login' onClick={logout}>
    Logout
  </Menu.Item>
)

const UnAuthenticatedMenuItems = () => {
  return (
    <>
      <Menu.Item key='home'>
        <Link to='/'>Home</Link>
      </Menu.Item>
      <Menu.Item key='greeting'>
        <Link to='/greeting'>Greeting</Link>
      </Menu.Item>
    </>
  )
}
const AuthenticatedMenuItems = () => {
  return (
    <>
      <Menu.Item key='adminGreeting'>
        <Link to='/adminGreeting'>Admin Greeting</Link>
      </Menu.Item>
    </>
  )
}

export const MenuBar = (): JSX.Element => {
  const { auth, login, logout } = useAuth()
  const isAuthenticated = auth?.isAuthenticated() ?? false

  return (
    <Menu mode='horizontal'>
      <UnAuthenticatedMenuItems />
      {isAuthenticated ? (
        <>
          <AuthenticatedMenuItems />
          <Logout logout={logout} />
        </>
      ) : (
        <Login login={login} />
      )}
    </Menu>
  )
}
