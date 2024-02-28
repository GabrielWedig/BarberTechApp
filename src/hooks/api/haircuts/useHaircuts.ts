import { PagedResponse } from './../base/Pagination'
import { useRequest } from '../base/useRequest'
import {
  CreateHaircutRequest,
  HaircutData,
  UpdateHaircutRequest
} from './Haircuts'

export const useHaircuts = () => {
  const { get, post, put, del } = useRequest('haircuts')

  // TODO: passar mais paremetros vindo da api
  const getAllHaircuts = async (
    page: number,
    pageSize: number
  ): Promise<PagedResponse<HaircutData[]>> => {
    const { data } = await get(`?Page=${page}&PageSize=${pageSize}`)
    return data
  }

  const createHaircut = async (
    id: string,
    request: CreateHaircutRequest
  ): Promise<void> => {
    await post(id, request)
  }

  const updateHaircut = async (
    id: string,
    request: UpdateHaircutRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const deleteHaircut = async (id: string): Promise<void> => {
    await del(id)
  }

  return {
    getAllHaircuts,
    createHaircut,
    updateHaircut,
    deleteHaircut
  }
}
