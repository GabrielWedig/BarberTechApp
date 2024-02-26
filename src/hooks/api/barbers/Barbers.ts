export interface BarberData {
  id: string
  name: string
  contact: string
  establishmentAddress: string
  about: string
  imageSource: string
  rating: number
  social: SocialData
  eventSchedules: EventScheduleData[]
}

export interface EventScheduleData {
  id: string
  dateTime: string
  name: string
  status: EventStatus
}

export interface SocialData {
  facebook?: string
  instagram?: string
  twitter?: string
}

type EventStatus = 'Active' | 'Completed' | 'Canceled'

export interface BarberOption {
  id: string
  name: string
}

export interface ScheduleHaircutRequest {
  haircutId: string
  name: string
  dateTime: string
}