import { Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { LoginLogout } from './LoginLogout'

export const MenuBar = (): JSX.Element => {
  return (
    <Menu mode='horizontal'>
      <Menu.Item key='home'>
        <Link to='/'>Home</Link>
      </Menu.Item>
      <Menu.Item key='greet'>
        <Link to='/greet'>Greet</Link>
      </Menu.Item>
      <Menu.Item key='securedGreet'>
        <Link to='/securedGreet'>Secured Greet</Link>
      </Menu.Item>
      <LoginLogout />
    </Menu>
  )
}
