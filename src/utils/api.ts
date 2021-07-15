import type {
  AdminGreetResponse,
  GreetResponse,
  UserInfoRequest
} from '../models/Models'
import { post } from './Http'

const greetingUrl = (baseUrl: string) => baseUrl + 'greeting'
const adminGreetingUrl = (baseUrl: string) => baseUrl + 'adminGreeting'

export const fetchGreeting = async (
  baseUrl: string,
  userInfo: UserInfoRequest
): Promise<GreetResponse | undefined> =>
  (await post<UserInfoRequest, GreetResponse>(greetingUrl(baseUrl), userInfo))
    .parsedBody

export const fetchAdminGreeting = async (
  baseUrl: string,
  userInfo: UserInfoRequest,
  token: string
): Promise<AdminGreetResponse | undefined> =>
  (
    await post<UserInfoRequest, GreetResponse>(
      adminGreetingUrl(baseUrl),
      userInfo,
      {
        Authorization: `Bearer ${token}`
      }
    )
  ).parsedBody
