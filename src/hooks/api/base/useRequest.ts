import axios, { AxiosResponse } from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { UploadClient } from '@uploadcare/upload-client'

export const useRequest = (baseURL: string) => {
  const authHeader = useAuthHeader()
  const uploadCareClient = new UploadClient({
    publicKey: 'cc50000eef3f769a4eed'
  }) // TODO: variável de ambiente

  const instance = axios.create({
    baseURL: `https://barber-tech-api.onrender.com/api/`, // TODO: variável de ambiente
    headers: {
      Authorization: authHeader
    }
  })

  const buildUrl = (url: string) => {
    return `${baseURL}/${url}`
  }

  return {
    get: async <T = any>(url: string = ''): Promise<AxiosResponse<T>> =>
      await instance.get(buildUrl(url)),

    del: async <T = any>(url: string = ''): Promise<AxiosResponse<T>> =>
      await instance.delete(buildUrl(url)),

    put: async <T = any>(
      url: string = '',
      request?: any
    ): Promise<AxiosResponse<T>> => await instance.put(buildUrl(url), request),

    post: async <T = any>(
      url: string = '',
      request: any
    ): Promise<AxiosResponse<T>> => await instance.post(buildUrl(url), request),

    uploadImage: async (file: File): Promise<string> => {
      const response = await uploadCareClient.uploadFile(file)
      return response.name ?? ''
    }
  }
}
