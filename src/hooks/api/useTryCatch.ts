import { AxiosError } from 'axios'
import { useSnackbarContext } from '../context'
import { Option } from '../../components'
import { useRequest } from './base/useRequest'

interface ErrorResponse {
  Title: string
  Status: number
  Errors: string[]
}

interface Response<T> {
  success?: boolean
  data?: T | null
}

export const useTryCatch = () => {
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()
  const { uploadImage } = useRequest('')

  const fetchWithMessage = async <T>(promise: Promise<T>, message: string) => {
    const { data, success } = await fetchData(promise)
    if (data && success) {
      showSuccessSnackbar(message)
    }
  }

  const fetchAndSet = async <T>(
    promise: Promise<T>,
    set: (prop: T) => void
  ) => {
    const { data, success } = await fetchData(promise)
    if (data && success) {
      set(data)
    }
  }

  const fetchAndReset = async <T>(
    promise: Promise<T>,
    reset: (data: T) => void
  ) => {
    const { data, success } = await fetchData(promise)
    if (data && success) {
      reset(data)
    }
  }

  const fetchAndMapOptions = async <T>(
    promise: Promise<T>
  ): Promise<Option[]> => {
    const { data, success } = await fetchData(promise)

    if (Array.isArray(data) && data && success) {
      return data.map((d) => ({
        name: d.name,
        value: d.id
      }))
    }
    return []
  }

  const fetchAndUploadImage = async (
    file: File,
    defaultValue?: string
  ): Promise<string> => {
    const { data, success } = await fetchData(uploadImage(file))

    if (data && success) {
      return data
    }
    return defaultValue ?? ''
  }

  const fetchData = async <T>(promise: Promise<T>): Promise<Response<T>> => {
    try {
      const data = await promise
      return { data, success: true }
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const response = axiosError?.response?.data as ErrorResponse
      showErrorSnackbar(response.Errors[0])
      return { data: null, success: false }
    }
  }

  return {
    fetchData,
    fetchWithMessage,
    fetchAndMapOptions,
    fetchAndSet,
    fetchAndReset,
    fetchAndUploadImage
  }
}
