interface CommonData {
  id: string
  address: string
  imageSource: string
}

export interface EstablishmentsData extends CommonData {
  businessTime: string
  rating: number
}

export interface EstablishmentData extends CommonData {
  openTime: string
  lunchTime: string
  workInterval: string,
  lunchInterval: string
}

export interface CreateEstablishmentRequest {
  address: string
  imageSource: string
  openTime: string
  lunchTime: string
  workInterval: string
  lunchInterval: string
}

export interface UpdateEstablishmentRequest {
  address?: string
  imageSource?: string
  openTime?: string
  lunchTime?: string
  workInterval?: string
  lunchInterval?: string
}
