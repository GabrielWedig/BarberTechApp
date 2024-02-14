export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  name: string
}

export interface LoginResponse {
  token: string
  user: UserResponse
}

export interface UserResponse {
  id: string
  email: string
  name: string
  eventSchedules: EventScheduleResponse[]
}

interface EventScheduleResponse {
  id: string
  dateTime: Date
  name: string
  status: StatusType
}

type StatusType = 'Active' | 'Canceled' | 'Completed'
