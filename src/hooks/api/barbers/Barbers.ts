export interface BarberData {
  id: string
  name: string
  about: string
  imageSource: string
  contact: string
  qntStars: number
  establishmentAddress: string
  eventSchedules: EventScheduleData[]
}

export interface EventScheduleData {
  id: string
  dateTime: string
  name: string
  status: EventStatus
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
