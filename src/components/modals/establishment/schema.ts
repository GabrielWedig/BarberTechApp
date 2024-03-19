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
  address: commomSchema.address.required('Obrigatório'),
  imageSource: commomSchema.imageSource.required('Obrigatório'),
  openTime: commomSchema.openTime.required('Obrigatório'),
  lunchTime: commomSchema.lunchTime.required('Obrigatório'),
  workInterval: commomSchema.workInterval.required('Obrigatório'),
  lunchInterval: commomSchema.lunchInterval.required('Obrigatório')
}
