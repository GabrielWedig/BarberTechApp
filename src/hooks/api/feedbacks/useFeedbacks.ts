import { useRequest } from '../base/useRequest'
import { FeedbackData } from './Feedbacks'

export const useFeedbacks = () => {
  const { get } = useRequest('feedbacks')

  const getAllFeedbacks = async (): Promise<FeedbackData[]> => {
    const { data } = await get()
    return data
  }

  return {
    getAllFeedbacks
  }
}
