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
  eventSchedules: EventScheduleData[]
  status: UserStatus
}

interface EventScheduleData {
  id: string
  dateTime: string
  name: string
  status: EventScheduleStatus
}

type EventScheduleStatus = 'Active' | 'Canceled' | 'Completed'
type UserStatus = 'Admin' | 'Barber' | 'Client'