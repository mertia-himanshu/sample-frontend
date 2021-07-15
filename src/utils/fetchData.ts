const handleRes = <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data, status code = ${res.status} , reason = ${res.statusText}`
    )
  }
  return res.json()
}

export const fetchData = async <T, R>(
  url: string,
  model: T,
  authHeader?: { Authorization: string }
): Promise<R> => {
  const headers = { 'Content-Type': 'application/json', ...authHeader }
  const fetchResponse = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(model),
    headers
  })

  return await handleRes(fetchResponse)
}
