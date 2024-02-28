export interface EstablishmentData {
  id: string
  address: string
  imageSource: string
  businessTime: string
  rating: number
}

export interface CreateEstablishmentRequest {
  address: string
  imageSource: string
  openTime: string,
  lunchTime: string,
  workInterval: string,
  lunchInterval: string
}

export interface UpdateEstablishmentRequest {
  address?: string
  imageSource?: string
  openTime?: string,
  lunchTime?: string,
  workInterval?: string,
  lunchInterval?: string
}