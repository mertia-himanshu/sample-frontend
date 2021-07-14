import type { GreetResponse, UserInfoRequest } from '../models/Models'
import { fetchData } from './fetchData'

const greetingUrl = (baseUrl: string) => baseUrl + 'greeting'
const adminGreetingUrl = (baseUrl: string) => baseUrl + 'adminGreeting'

export const fetchGreeting = (
  baseUrl: string,
  userInfo: UserInfoRequest
): Promise<GreetResponse> => fetchData(greetingUrl(baseUrl), userInfo)

export const fetchAdminGreeting = (
  baseUrl: string,
  userInfo: UserInfoRequest,
  token: string
): Promise<GreetResponse> =>
  fetchData(adminGreetingUrl(baseUrl), userInfo, {
    Authorization: `Bearer ${token}`
  })
