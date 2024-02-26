import { PagedResponse } from './../base/Pagination'
import { useRequest } from '../base/useRequest'
import { HaircutData } from './Haircuts'

export const useHaircuts = () => {
  const { get } = useRequest('haircuts')

  const getAllHaircuts = async (
    page: number,
    pageSize: number
  ): Promise<PagedResponse<HaircutData[]>> => {
    const { data } = await get(`?Page=${page}&PageSize=${pageSize}`)
    return data
  }

  return {
    getAllHaircuts
  }
}
