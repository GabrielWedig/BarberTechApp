import { Paged } from './../base/Pagination'
import { useRequest } from '../base/useRequest'
import {
  CreateFeedbackRequest,
  FeedbacksData,
  UpdateFeedbackRequest
} from './Feedbacks'

export const useFeedbacks = () => {
  const { get, post, put, del } = useRequest('feedbacks')

  const getAllFeedbacks = async (
    page: number,
    pageSize: number,
    searchTerm?: string
  ): Promise<Paged<FeedbacksData[]>> => {
    const { data } = await get(
      `?Page=${page}&PageSize=${pageSize}&SearchTerm=${searchTerm ?? ''}`
    )
    return data
  }

  const createFeedback = async (
    request: CreateFeedbackRequest
  ): Promise<void> => {
    await post('', request)
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
