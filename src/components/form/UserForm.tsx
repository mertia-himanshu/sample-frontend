import { Button, Form, Input, Typography } from 'antd'
import React from 'react'
import { useLocationService } from '../contexts/LocationServiceContext'
import { fetchData, showError } from '../helpers/HttpUtils'
import { resolveBackendUrl } from '../helpers/resolveBackend'
import type { GreetResponse, UserInfoRequest } from '../models/Models'
import styles from './UserForm.module.css'

const UserForm = ({
  onSubmitHandler,
  path,
  authHeader
}: {
  onSubmitHandler: (message: string) => void
  path: string
  authHeader?: { Authorization: string }
}): JSX.Element => {
  const locationService = useLocationService()

  const onFinish = async (values: UserInfoRequest) => {
    const backendLocation = await resolveBackendUrl(locationService)
    if (backendLocation === undefined) {
      showError(
        `Failed to greet user: ${values.firstname} ${values.lastname}`,
        new Error('Not able to resolve backend')
      )
      return
    }
    const response: GreetResponse | GreetResponse[] = await fetchData(
      backendLocation.uri + path,
      { _type: 'UserInfo', ...values },
      authHeader
    )

    Array.isArray(response)
      ? onSubmitHandler(response[0].msg)
      : onSubmitHandler(response.msg)
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
          <Typography.Title level={4}>{`User Info:`}</Typography.Title>
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
