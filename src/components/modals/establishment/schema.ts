import * as yup from 'yup'

export const getEstablishmentSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? commomSchema : createSchema)

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
