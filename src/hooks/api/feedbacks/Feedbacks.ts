export interface FeedbacksData {
  id: string
  comment: string
  ratingAverage: number
  userName: string
  barberName: string
  haircutName: string
  establishmentAddress: string
  at: string
}

export interface CreateFeedbackRequest {
  comment?: string
  eventScheduleId: string
  ratingBarber: number
  ratingHaircut: number
  ratingEstablishment: number
}

export interface UpdateFeedbackRequest {
  comment?: string
  ratingBarber?: number
  ratingHaircut?: number
  ratingEstablishment?: number
}
