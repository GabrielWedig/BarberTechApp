import * as yup from 'yup'

export const getBarberSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? commomSchema : createSchema)

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
