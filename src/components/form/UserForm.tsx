import { AuthContext } from '@tmtsoftware/esw-ts'
import { Button, Form, Input, Typography } from 'antd'
import React, { useContext } from 'react'
import { useLocationService } from '../contexts/LocationServiceContext'
import { greetUser, securedGreetUser, showError } from '../helpers/HttpUtils'
import { resolveBackendUrl } from '../helpers/resolveBackend'
import type { UserInfoRequest } from '../models/Models'
import styles from './UserForm.module.css'

const UserForm = ({
  onSubmitHandler,
  isSecured = false
}: {
  onSubmitHandler: (message: string) => void
  isSecured?: boolean
}): JSX.Element => {
  const locationService = useLocationService()
  const { auth } = useContext(AuthContext)
  const secured = isSecured ? 'Secured' : ''

  const onFinish = async (values: UserInfoRequest) => {
    const backendLocation = await resolveBackendUrl(locationService)
    if (backendLocation === undefined) {
      showError(
        `Failed to greet user: ${values.firstname} ${values.lastname}`,
        new Error('Not able to resolve backend')
      )
      return
    }
    if (isSecured) {
      const response = await securedGreetUser(
        backendLocation.uri,
        values,
        auth?.token()
      )
      onSubmitHandler(response[0].msg)
    } else {
      const response = await greetUser(backendLocation.uri, values)
      onSubmitHandler(response.msg)
    }
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  return (
    <>
      <Form
        {...layout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className={styles.formBody}>
        <Form.Item className={styles.formHeader}>
          <Typography.Title level={4}>
            {`${secured} User Info:`}
          </Typography.Title>
        </Form.Item>
        <Form.Item
          label='FirstName'
          name='firstname'
          rules={[{ required: true, message: 'Please enter your firstname!' }]}>
          <Input role='FirstName' />
        </Form.Item>

        <Form.Item
          label='LastName'
          name='lastname'
          rules={[{ required: true, message: 'Please enter your lastname!' }]}>
          <Input role='LastName' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' role='Submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default UserForm
