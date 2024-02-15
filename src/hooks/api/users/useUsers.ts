import { useRequest } from '../..'
import { LoginRequest, LoginResponse, RegisterRequest } from './Users'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

export const useUsers = () => {
  const { post } = useRequest('users')
  const signIn = useSignIn()

  const login = async (request: LoginRequest): Promise<void> => {
    const { data } = await post<LoginResponse>('login', request)
    signInUser(data)
  }

  const register = async (request: RegisterRequest): Promise<void> => {
    const { data } = await post<LoginResponse>('register', request)
    signInUser(data)
  }

  const signInUser = (data: LoginResponse) =>
    signIn({
      auth: {
        token: data.token,
        type: 'Bearer'
      },
      userState: data.userId
    })

  return {
    login,
    register
  }
}
