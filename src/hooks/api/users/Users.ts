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
  imageSource: string | null
  type: UserType
}

export interface CompleteUserData extends UserData {
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