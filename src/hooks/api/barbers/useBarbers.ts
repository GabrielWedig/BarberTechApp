import { Paged } from './../base/Pagination'
import { useRequest } from '../base/useRequest'
import {
  BarberData,
  BarbersData,
  CalendarData,
  CreateBarberRequest,
  UpdateBarberRequest
} from './Barbers'

export const useBarbers = () => {
  const { get, post, put, del } = useRequest('barbers')

  const getAllBarbers = async (
    page: number,
    pageSize: number,
    searchTerm?: string
  ): Promise<Paged<BarbersData[]>> => {
    const { data } = await get(
      `?Page=${page}&PageSize=${pageSize}&SearchTerm=${searchTerm ?? ''}`
    )
    return data
  }

  const getBarberById = async (id: string): Promise<BarberData> => {
    const { data } = await get(id)
    return data
  }

  const createBarber = async (request: CreateBarberRequest): Promise<void> => {
    await post('', request)
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
    const { data } = await get(`${barberId}/avaliable-times?date=${date}`)
    return data
  }

  const getCalendar = async (barberId: string): Promise<CalendarData> => {
    const { data } = await get(`${barberId}/calendar`)
    return data
  }

  return {
    getAllBarbers,
    getBarberById,
    createBarber,
    updateBarber,
    deleteBarber,
    getAvaliableDates,
    getAvaliableTimes,
    getCalendar
  }
}
