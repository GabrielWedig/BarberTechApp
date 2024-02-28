import { useRequest } from '../base/useRequest'

export const useSchedules = () => {
  const { put } = useRequest('event-schedules')

  const cancelSchedule = async (id: string): Promise<void> => {
    await put(`${id}/cancel`)
  }

  const completeSchedule = async (id: string): Promise<void> => {
    await put(`${id}/complete`)
  }

  return {
    cancelSchedule,
    completeSchedule
  }
}
