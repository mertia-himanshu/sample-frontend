import { Result } from 'antd'
import React from 'react'

const LoginError = (): JSX.Element => (
  <Result status='error' title='Please login to use Secure Greet' />
)

export default LoginError
