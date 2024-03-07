export interface EventSchedulesData {
  id: string
  name: string,
  barberName: string,
  haircutName: string,
  date: string
  status: EventStatus
}

export interface CreateScheduleRequest {
  barberId: string
  haircutId: string
  name: string
  dateTime: string
}

type EventStatus = 'Active' | 'Completed' | 'Canceled'
