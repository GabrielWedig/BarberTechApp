interface CommonData {
  id: string
  about?: string
  social: SocialData
}

export interface BarbersData extends CommonData {
  name: string
  imageSource?: string
  rating: number
}

export interface BarberData extends CommonData {
  establishmentId: string
  contact: string
}

export interface SocialData {
  facebook?: string
  instagram?: string
  twitter?: string
}

export interface CreateBarberRequest {
  establishmentId: string
  userId: string
  about?: string
  social: SocialData
  contact: string
}

export interface UpdateBarberRequest {
  establishmentId?: string
  about?: string
  contact?: string
  social: SocialData
}

export interface BarberOption {
  id: string
  name: string
}