import axios, { AxiosResponse } from 'axios'

export const useRequest = (baseURL: string) => {
  const instance = axios.create({
    baseURL: `https://barber-tech-api.onrender.com/api/`
    //headers,
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
      data: any
    ): Promise<AxiosResponse<T>> => await instance.put(buildUrl(url), data),

    post: async <T = any>(
      url: string = '',
      data: any
    ): Promise<AxiosResponse<T>> => await instance.post(buildUrl(url), data)
  }
}
