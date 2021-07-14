import { Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LoginLogout } from './LoginLogout'

export const MenuBar = (): JSX.Element => {
  const { auth } = useAuth()
  const isAuthenticated = auth?.isAuthenticated() ?? false

  return (
    <Menu mode='horizontal'>
      <Menu.Item key='home'>
        <Link to='/'>Home</Link>
      </Menu.Item>
      <Menu.Item key='greeting'>
        <Link to='/greeting'>Greeting</Link>
      </Menu.Item>
      {isAuthenticated && (
        <Menu.Item key='adminGreeting'>
          <Link to='/adminGreeting'>Admin Greeting</Link>
        </Menu.Item>
      )}
      <LoginLogout />
    </Menu>
  )
}
