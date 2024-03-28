import * as yup from 'yup'

export const getScheduleSchema = (hasHaircut: boolean) =>
  yup.object().shape(hasHaircut ? commonSchema : haircutSchema)

const optionSchema = yup.object().shape({
  name: yup.string().required(),
  value: yup.string().required()
})

const commonSchema = {
  name: yup.string(),
  establishment: optionSchema.required('Obrigatório'),
  barber: optionSchema.required('Obrigatório'),
  date: yup.string().required('Obrigatório'),
  schedule: yup.string().required('Obrigatório')
}

const haircutSchema = {
  ...commonSchema,
  haircut: optionSchema.required('Obrigatório')
}
