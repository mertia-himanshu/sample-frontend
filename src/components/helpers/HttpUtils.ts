import { message } from 'antd'

const handleRes = <T>(res: Response, reader: (res: Response) => T) => {
  if (!res.ok) {
    showError('Failed to greet user', new Error(res.statusText))
  }
  return reader(res) //TODO should this throw error or just return when not OK
}

export const fetchData = async <T, R>(
  url: string,
  model: T,
  authHeader?: { Authorization: string }
): Promise<R> => {
  const headers = { 'Content-Type': 'application/json', ...authHeader }
  console.log(headers)
  const fetchResponse = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(model),
    headers
  })

  return await handleRes(fetchResponse, (res) => res.json())
}

export const showError = (prefixMsg: string, error: Error): void => {
  const err = `${prefixMsg}, reason: ${error.message}`
  console.error(err)
  message.error(err)
}
