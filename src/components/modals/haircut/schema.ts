import * as yup from 'yup'
import { HaircutData } from '../../../hooks'

export const getHaircutSchema = (isNew: boolean) =>
  yup.object().shape(isNew ? createSchema : commomSchema)

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

export const getDefaultHaircutValues = (haircut?: HaircutData) => {
  return {
    name: haircut?.name ?? '',
    about: haircut?.about ?? '',
    price: haircut?.price ?? 0,
    imageSource: haircut?.imageSource ?? ''
  }
}
