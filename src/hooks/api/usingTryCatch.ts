//import { isError, toString } from 'lodash'

export interface DataResponse<T> {
  data: T | null
  error: unknown //Error | null
  success: boolean
}

export async function usingTryCatch<T>(
  promise: Promise<T>
): Promise<DataResponse<T>> {
  try {
    const data = await promise
    return { data, error: null, success: true }
  } catch (error: unknown) {
    return {
      data: null,
      error: error, //isError(error) ? error : new Error(toString(error)) // ver se precisa do lodash
      success: false
    }
  }
}
