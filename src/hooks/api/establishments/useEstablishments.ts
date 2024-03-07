import { PagedResponse } from './../base/Pagination'
import { useRequest } from '../base/useRequest'
import {
  CreateEstablishmentRequest,
  EstablishmentData,
  EstablishmentsData,
  UpdateEstablishmentRequest
} from './Establishments'

export const useEstablishments = () => {
  const { get, post, put, del } = useRequest('establishments')

  const getAllEstablishments = async (
    page: number,
    pageSize: number,
    searchTerm?: string
  ): Promise<PagedResponse<EstablishmentsData[]>> => {
    const { data } = await get(
      `?Page=${page}&PageSize=${pageSize}&SearchTerm=${searchTerm}`
    )
    return data
  }

  const getEstablishmentById = async (
    id: string
  ): Promise<EstablishmentData> => {
    const { data } = await get(id)
    return data
  }

  const createEstablishment = async (
    request: CreateEstablishmentRequest
  ): Promise<void> => {
    await post('', request)
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
    getEstablishmentById,
    createEstablishment,
    updateEstablishment,
    deleteEstablishment
  }
}
