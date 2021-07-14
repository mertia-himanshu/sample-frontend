import { AuthContext } from '@tmtsoftware/esw-ts'
import { Menu } from 'antd'
import React, { useContext } from 'react'
export const LoginLogout = (): JSX.Element => {
  const { auth, login, logout } = useContext(AuthContext)

  if (auth?.isAuthenticated())
    return (
      <Menu.Item key='login' onClick={logout}>
        Logout
      </Menu.Item>
    )
  else
    return (
      <Menu.Item key='logout' onClick={login}>
        Login
      </Menu.Item>
    )
}
