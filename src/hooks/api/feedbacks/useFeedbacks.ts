import { useRequest } from '../base/useRequest'
import {
  CreateFeedbackRequest,
  FeedbackData,
  UpdateFeedbackRequest
} from './Feedbacks'

export const useFeedbacks = () => {
  const { get, post, put, del } = useRequest('feedbacks')

  const getAllFeedbacks = async (): Promise<FeedbackData[]> => {
    const { data } = await get()
    return data
  }

  const createFeedback = async (
    id: string,
    request: CreateFeedbackRequest
  ): Promise<void> => {
    await post(id, request)
  }

  const updateFeedback = async (
    id: string,
    request: UpdateFeedbackRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const deleteFeedback = async (id: string): Promise<void> => {
    await del(id)
  }

  return {
    getAllFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback
  }
}
