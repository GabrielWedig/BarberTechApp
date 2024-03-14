import * as yup from 'yup'

export const getHaircutSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? commomSchema : createSchema)

const commomSchema = {
  name: yup.string(),
  about: yup.string(),
  price: yup.number(),
  imageSource: yup.string()
}

const createSchema = {
  ...commomSchema,
  name: commomSchema.name.required(),
  price: commomSchema.price.required(),
  imageSource: commomSchema.imageSource.required()
}
