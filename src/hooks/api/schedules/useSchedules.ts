import { PagedResponse } from '../base/Pagination'
import { useRequest } from '../base/useRequest'
import { EventSchedulesData, CreateScheduleRequest } from './EventSchedules'

export const useSchedules = () => {
  const { put, get, post } = useRequest('event-schedules')

  const getAllSchedules = async (
    page: number,
    pageSize: number,
    searchTerm?: string
  ): Promise<PagedResponse<EventSchedulesData[]>> => {
    const { data } = await get(
      `?Page=${page}&PageSize=${pageSize}&SearchTerm=${searchTerm}`
    )
    return data
  }

  const cancelSchedule = async (id: string): Promise<void> => {
    await put(`${id}/cancel`)
  }

  const completeSchedule = async (id: string): Promise<void> => {
    await put(`${id}/complete`)
  }

  const createSchedule = async (
    request: CreateScheduleRequest
  ): Promise<void> => {
    await post('', request)
  }

  return {
    getAllSchedules,
    cancelSchedule,
    completeSchedule,
    createSchedule
  }
}
