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
  dateTime: Date,
  name: string,
  status: EventStatus
}

type EventStatus = 'Active' | 'Comepleted' | 'Canceled'