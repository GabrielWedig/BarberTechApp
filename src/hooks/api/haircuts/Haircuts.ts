export interface HaircutData {
  id: string
  name: string
  about?: string
  price: number
  imageSource: string
  rating: number
}

export interface CreateHaircutRequest {
  name: string
  about?: string
  price: number
  imageSource: string
}

export interface UpdateHaircutRequest {
  name?: string
  about?: string
  price?: number
  imageSource?: string
}
