export interface BarberData {
  id: string
  contact: string
  establishmentAddress: string
  about: string
  imageSource: string
  rating: number
  social: SocialData
}

export interface SocialData {
  facebook?: string
  instagram?: string
  twitter?: string
}

export interface CreateBarberRequest {
  establishmentId: string,
  userId: string
  about?: string,
  social: SocialData,
  contact: string,
  imageSource: string,
}

export interface UpdateBarberRequest {
  establishmentId?: string,
  about?: string,
  contact?: string,
  imageSource?: string,
  social: SocialData,
}

export interface BarberOption {
  id: string
  name: string
}

export interface ScheduleHaircutRequest {
  haircutId: string
  name: string
  dateTime: string
}