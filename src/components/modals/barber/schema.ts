import * as yup from 'yup'
import { BarberData } from '../../../hooks'

export const getBarberSchema = (isNew: boolean) =>
  yup.object().shape(isNew ? createSchema : commomSchema)

const commomSchema = {
  establishmentId: yup.string(),
  about: yup.string(),
  contact: yup.string(),
  instagram: yup.string(),
  twitter: yup.string(),
  facebook: yup.string()
}

const createSchema = {
  ...commomSchema,
  establishmentId: commomSchema.establishmentId.required(),
  userId: yup.string().required(),
  contact: commomSchema.contact.required()
}

export const getDefaultBarberValues = (barber?: BarberData) => {
  return {
    establishmentId: barber?.establishmentId ?? '',
    about: barber?.about,
    contact: barber?.contact ?? '',
    instagram: barber?.social.instagram,
    twitter: barber?.social.twitter,
    facebook: barber?.social.facebook
  }
}
