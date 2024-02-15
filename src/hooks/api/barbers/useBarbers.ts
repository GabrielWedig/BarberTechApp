import { useRequest } from '../base/useRequest'
import { BarberData, BarberOption } from './Barbers'

export const useBarbers = () => {
  const { get } = useRequest('barbers')

  const getAllBarbers = async (): Promise<BarberData[]> => {
    const { data } = await get()
    return data
  }

  const getBarberOptions = async (): Promise<BarberOption[]> => {
    const { data } = await get('options')
    return data
  }

  const getAvaliableDates = async (barberId: string): Promise<string[]> => {
    const { data } = await get(`${barberId}/avaliable-dates`)
    return data
  }

  const getAvaliableTimes = async (
    barberId: string,
    date: string
  ): Promise<string[]> => {
    const { data } = await get(`${barberId}/avaliable-times?Date=${date}`)
    return data
  }

  return {
    getAllBarbers,
    getBarberOptions,
    getAvaliableDates,
    getAvaliableTimes
  }
}
