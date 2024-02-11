import { useRequest } from '../base/useRequest'
import { EstablishmentData } from './Establishments'

export const useEstablishments = () => {
  const { get } = useRequest('establishments')

  const getAllEstablishments = async (): Promise<EstablishmentData[]> => {
    const { data } = await get()
    return data
  }

  return {
    getAllEstablishments
  }
}
