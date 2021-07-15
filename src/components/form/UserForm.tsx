import { Button, Form, Input, Layout, Typography } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React from 'react'
import type { UserInfoRequest } from '../../models/Models'
import styles from './UserForm.module.css'

export const UserForm = ({
  onFinish
}: {
  onFinish: (values: UserInfoRequest) => Promise<void>
}): JSX.Element => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return (
    <Layout>
      <Content className={styles.content}>
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
            rules={[
              { required: true, message: 'Please enter your firstname!' }
            ]}>
            <Input role='FirstName' />
          </Form.Item>

          <Form.Item
            label='LastName'
            name='lastname'
            rules={[
              { required: true, message: 'Please enter your lastname!' }
            ]}>
            <Input role='LastName' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit' role='Submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}
