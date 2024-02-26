import { PagedResponse } from './../base/Pagination'
import { useRequest } from '../base/useRequest'
import { EstablishmentData } from './Establishments'

export const useEstablishments = () => {
  const { get } = useRequest('establishments')

  const getAllEstablishments = async (
    page: number,
    pageSize: number
  ): Promise<PagedResponse<EstablishmentData[]>> => {
    const { data } = await get(`?Page=${page}&PageSize=${pageSize}`)
    return data
  }

  return {
    getAllEstablishments
  }
}
