import { Paged, useRequest } from '../..'
import {
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
  UpdateUserRequest,
  UserData,
  UserOption,
  UsersData
} from './Users'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

export const useUsers = () => {
  const { post, get, put, del } = useRequest('users')
  const signIn = useSignIn()

  const getAllUsers = async (
    page: number,
    pageSize: number,
    searchTerm?: string
  ): Promise<Paged<UsersData[]>> => {
    const { data } = await get(
      `?Page=${page}&PageSize=${pageSize}&SearchTerm=${searchTerm ?? ''}`
    )
    return data
  }

  const getUserById = async (id: string): Promise<UserData> => {
    const { data } = await get(id)
    return data
  }

  const getUserOptions = async (seachTerm?: string): Promise<UserOption[]> => {
    const { data } = await get(`options?SearchTerm=${seachTerm ?? ''}`)
    return data
  }

  const updateUser = async (
    id: string,
    request: UpdateUserRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const deleteUser = async (id: string): Promise<void> => {
    await del(id)
  }

  const login = async (request: LoginRequest): Promise<void> => {
    const { data } = await post<LoginResponse>('login', request)
    signInUser(data)
  }

  const register = async (
    request: RegisterUserRequest,
    signIn = true
  ): Promise<void> => {
    const { data } = await post<LoginResponse>('register', request)

    if (signIn) {
      signInUser(data)
    }
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
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    getUserOptions
  }
}
