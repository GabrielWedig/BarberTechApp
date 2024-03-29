import { Paged } from './../base/Pagination'
import { useRequest } from '../base/useRequest'
import {
  CreateHaircutRequest,
  HaircutData,
  HaircutOption,
  HaircutsData,
  UpdateHaircutRequest
} from './Haircuts'

export const useHaircuts = () => {
  const { get, post, put, del } = useRequest('haircuts')

  const getAllHaircuts = async (
    page: number,
    pageSize: number,
    searchTerm?: string
  ): Promise<Paged<HaircutsData[]>> => {
    const { data } = await get(
      `?Page=${page}&PageSize=${pageSize}&SearchTerm=${searchTerm ?? ''}`
    )
    return data
  }

  const getHaircutById = async (id: string): Promise<HaircutData> => {
    const { data } = await get(id)
    return data
  }

  const getHaircutOptions = async (
    searchTerm?: string
  ): Promise<HaircutOption[]> => {
    const { data } = await get(`options?SearchTerm=${searchTerm ?? ''}`)
    return data
  }

  const createHaircut = async (
    request: CreateHaircutRequest
  ): Promise<void> => {
    await post('', request)
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
    getHaircutById,
    getHaircutOptions,
    createHaircut,
    updateHaircut,
    deleteHaircut
  }
}
