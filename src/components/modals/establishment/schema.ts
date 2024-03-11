import * as yup from 'yup'
import { EstablishmentData } from '../../../hooks'

export const getEstablishmentSchema = (isNew: boolean) =>
  yup.object().shape(isNew ? createSchema : commomSchema)

const commomSchema = {
  address: yup.string(),
  imageSource: yup.string(),
  openTime: yup.string(),
  lunchTime: yup.string(),
  workInterval: yup.string(),
  lunchInterval: yup.string()
}

const createSchema = {
  ...commomSchema,
  address: commomSchema.address.required(),
  imageSource: commomSchema.imageSource.required(),
  openTime: commomSchema.openTime.required(),
  lunchTime: commomSchema.lunchTime.required(),
  workInterval: commomSchema.workInterval.required(),
  lunchInterval: commomSchema.lunchInterval.required()
}

export const getDefaultEstablishmentValues = (
  establishment?: EstablishmentData
) => {
  return {
    address: establishment?.address ?? '',
    imageSource: establishment?.imageSource ?? '',
    openTime: establishment?.openTime ?? '',
    lunchTime: establishment?.lunchTime ?? '',
    workInterval: establishment?.workInterval ?? '',
    lunchInterval: establishment?.lunchInterval ?? ''
  }
}
