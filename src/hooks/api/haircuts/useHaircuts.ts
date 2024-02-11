import { useRequest } from '../base/useRequest'
import { HaircutData } from './Haircuts'

export const useHaircuts = () => {
  const { get } = useRequest('haircuts')

  const getAllHaircuts = async (): Promise<HaircutData[]> => {
    const { data } = await get()
    return data
  }

  return {
    getAllHaircuts
  }
}
