export interface FeedbackData {
  id: string
  comment: string
  ratingAverage: number
  userName: string
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
