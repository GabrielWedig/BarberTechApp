import { useRequest } from '../base/useRequest'
import { BarberData } from './Barbers'

export const useBarbers = () => {
  const { get } = useRequest('barbers')

  const getAllBarbers = async (): Promise<BarberData[]> => {
    const { data } = await get()
    return data
  }

  return {
    getAllBarbers
  }
}
