import { message } from 'antd'
import type { GreetResponse } from '../models/Models'

const getPath = (basePath: string) => basePath + 'sayHello'
const getSecurePath = (basePath: string) => basePath + 'securedSayHello'

const handleRes = <T>(res: Response, reader: (res: Response) => T) => {
  if (!res.ok) {
    showError('Failed to greet user', new Error(res.statusText))
  }
  return reader(res)
}

export const greetUser = async (
  baseUri: string,
  body: { firstname: string; lastname: string }
): Promise<GreetResponse> => {
  const url = getPath(baseUri)
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ _type: 'UserInfo', ...body }),
    headers
  })
  return await handleRes(res, (res) => res.json())
}

export const securedGreetUser = async (
  baseUri: string,
  body: { firstname: string; lastname: string },
  token?: string
): Promise<GreetResponse[]> => {
  const url = getSecurePath(baseUri)
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ _type: 'UserInfo', ...body }),
    headers
  })
  return await handleRes(res, (res_2) => res_2.json())
}

export const showError = (prefixMsg: string, error: Error): void => {
  const err = `${prefixMsg}, reason: ${error.message}`
  console.error(err)
  message.error(err)
}
