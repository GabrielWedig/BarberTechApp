import { useRequest } from '../base/useRequest'
import { GetAllHaircutsResponse } from './Haircuts'

export const useHaircuts = () => {
  const { get } = useRequest('haircuts')

  const getAllHaircuts = async (): Promise<GetAllHaircutsResponse[]> => {
    const { data } = await get()
    return data
  }

  return {
    getAllHaircuts
  }
}
