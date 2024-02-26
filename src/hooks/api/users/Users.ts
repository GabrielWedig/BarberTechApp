export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  name: string
}

export interface LoginResponse {
  token: string
  user: UserData
}

export interface UserData {
  id: string
  email: string
  name: string
  photo: string | null
  type: UserType
}

type UserType = 'Admin' | 'Barber' | 'Client'