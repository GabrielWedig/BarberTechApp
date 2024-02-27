import { useRequest } from '../..'
import {
  CompleteUserData,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserData
} from './Users'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

export const useUsers = () => {
  const { post, get } = useRequest('users')
  const signIn = useSignIn()

  const login = async (request: LoginRequest): Promise<void> => {
    const { data } = await post<LoginResponse>('login', request)
    signInUser(data)
  }

  const register = async (request: RegisterRequest): Promise<void> => {
    const { data } = await post<LoginResponse>('register', request)
    signInUser(data)
  }

  const getById = async (id: string): Promise<UserData> => {
    const { data } = await get<CompleteUserData>(id)
    return data
  }

  const signInUser = (data: LoginResponse) =>
    signIn({
      auth: {
        token: data.token,
        type: 'Bearer'
      },
      userState: data.user
    })

  return {
    login,
    register,
    getById
  }
}
