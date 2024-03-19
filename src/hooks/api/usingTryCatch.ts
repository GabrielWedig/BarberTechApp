import { AxiosError } from 'axios'

interface ErrorResponse {
  Title: string
  Status: number
  Errors: string[]
}

export interface DataResponse<T> {
  data: T | null
  error: string | null
}

export async function usingTryCatch<T>(
  promise: Promise<T> //| Promise<T>[]
): Promise<DataResponse<T>> {
  try {
    const data = await promise
    return { data, error: null }
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    const data = axiosError?.response?.data as ErrorResponse

    return {
      data: null,
      error: data.Errors[0]
    }
  }
}