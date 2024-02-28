import { PagedResponse } from './../base/Pagination'
import { useRequest } from '../base/useRequest'
import {
  CreateEstablishmentRequest,
  EstablishmentData,
  UpdateEstablishmentRequest
} from './Establishments'

export const useEstablishments = () => {
  const { get, post, put, del } = useRequest('establishments')

  // TODO: passar mais paremetros vindo da api
  const getAllEstablishments = async (
    page: number,
    pageSize: number
  ): Promise<PagedResponse<EstablishmentData[]>> => {
    const { data } = await get(`?Page=${page}&PageSize=${pageSize}`)
    return data
  }

  const createEstablishment = async (
    id: string,
    request: CreateEstablishmentRequest
  ): Promise<void> => {
    await post(id, request)
  }

  const updateEstablishment = async (
    id: string,
    request: UpdateEstablishmentRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const deleteEstablishment = async (id: string): Promise<void> => {
    await del(id)
  }

  return {
    getAllEstablishments,
    createEstablishment,
    updateEstablishment,
    deleteEstablishment
  }
}
