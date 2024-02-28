import { PagedResponse } from './../base/Pagination'
import { useRequest } from '../base/useRequest'
import {
  BarberData,
  BarberOption,
  CreateBarberRequest,
  ScheduleHaircutRequest,
  UpdateBarberRequest
} from './Barbers'

export const useBarbers = () => {
  const { get, post, put, del } = useRequest('barbers')

  // TODO: passar mais paremetros vindo da api
  const getAllBarbers = async (
    page: number,
    pageSize: number
  ): Promise<PagedResponse<BarberData[]>> => {
    const { data } = await get(`?Page=${page}&PageSize=${pageSize}`)
    return data
  }

  const createBarber = async (
    id: string,
    request: CreateBarberRequest
  ): Promise<void> => {
    await post(id, request)
  }

  const getBarberOptions = async (): Promise<BarberOption[]> => {
    const { data } = await get('options')
    return data
  }

  const updateBarber = async (
    id: string,
    request: UpdateBarberRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const deleteBarber = async (id: string): Promise<void> => {
    await del(id)
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
    createBarber,
    getBarberOptions,
    updateBarber,
    deleteBarber,
    getAvaliableDates,
    getAvaliableTimes,
    scheduleHaircut
  }
}
