export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterUserRequest extends LoginRequest {
  name: string
  imageSource?: string | null
}

export interface UpdateUserRequest {
  email?: string
  name?: string
  imageSource?: string | null
  password?: string
}

export interface LoginResponse {
  token: string
  user: UserData
}

export interface UsersData {
  id: string
  email: string
  name: string
  type: UserType
}

interface LoginUser extends UsersData {
  imageSource?: string
}

export interface UserData extends LoginUser {
  eventSchedules: EventScheduleData[]
}

interface EventScheduleData {
  id: string
  dateTime: string
  userName: string
  barberName: string
  status: EventStatus
  feedbackId: string
  haircut: HaircutData
}

interface HaircutData {
  id: string
  name: string
  imageSource: string
}

export interface UserOption {
  id: string
  name: string
}

export type UserType = 'Admin' | 'Barber' | 'Client'
type EventStatus = 'Active' | 'Completed' | 'Canceled'
