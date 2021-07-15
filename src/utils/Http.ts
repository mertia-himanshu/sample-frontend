export interface HttpResponse<R> extends Response {
  parsedBody?: R
}

const http = async <Res>(request: RequestInfo): Promise<HttpResponse<Res>> => {
  const response: HttpResponse<Res> = await fetch(request)

  try {
    response.parsedBody = await response.json()
  } catch (ex) {
    throw new Error(`Failed to parse response, reason: ${ex} `)
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data, status code = ${response.status} , reason = ${response.statusText}`
    )
  }
  return response
}

export const get = async <Res>(path: string): Promise<HttpResponse<Res>> => {
  const args: RequestInit = { method: 'GET' }
  return await http<Res>(new Request(path, args))
}

export const post = async <Req, Res>(
  path: string,
  body: Req,
  headers?: HeadersInit
): Promise<HttpResponse<Res>> => {
  const args: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...headers }
  }
  return await http<Res>(new Request(path, args))
}

export const put = async <Req, Res>(
  path: string,
  body: Req,
  headers?: HeadersInit
): Promise<HttpResponse<Res>> => {
  const args: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...headers }
  }
  return await http<Res>(new Request(path, args))
}
