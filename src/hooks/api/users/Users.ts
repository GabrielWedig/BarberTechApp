export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterUserRequest extends LoginRequest {
  name: string
  imageSource?: string
}

export interface UpdateUserRequest {
  email?: string
  name?: string
  imageSource?: string
  password?: string
}

export interface LoginResponse {
  token: string
  user: UserData
}

export interface UserData {
  id: string
  email: string
  name: string
  imageSource: string | null
  type: UserType
}

export interface UserDataDetailed extends UserData {
  eventSchedules: EventScheduleData[]
}

interface EventScheduleData {
  id: string
  dateTime: string
  name: string
  status: EventStatus
}

export type UserType = 'Admin' | 'Barber' | 'Client'
type EventStatus = 'Active' | 'Completed' | 'Canceled'
