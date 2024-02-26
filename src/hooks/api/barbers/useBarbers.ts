import { PagedResponse } from './../base/Pagination';
import { useRequest } from '../base/useRequest'
import { BarberData, BarberOption, ScheduleHaircutRequest } from './Barbers'

export const useBarbers = () => {
  const { get, post } = useRequest('barbers')

  const getAllBarbers = async (page: number, pageSize: number): Promise<PagedResponse<BarberData[]>> => {
    const { data } = await get(`?Page=${page}&PageSize=${pageSize}`)
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

  const scheduleHaircut = async (
    barberId: string,
    request: ScheduleHaircutRequest
  ): Promise<void> => {
    await post(`${barberId}/schedule-haircut`, request)
  }

  return {
    getAllBarbers,
    getBarberOptions,
    getAvaliableDates,
    getAvaliableTimes,
    scheduleHaircut
  }
}
