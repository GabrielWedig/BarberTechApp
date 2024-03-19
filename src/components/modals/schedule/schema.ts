import * as yup from 'yup'

export const getScheduleSchema = (hasHaircut: boolean) =>
  yup.object().shape(hasHaircut ? commonSchema : haircutSchema)

const commonSchema = {
  name: yup.string(),
  establishment: yup.string().required('Obrigatório'),
  barber: yup.string().required('Obrigatório'),
  date: yup.string().required('Obrigatório'),
  schedule: yup.string().required('Obrigatório')
}

const haircutSchema = {
  ...commonSchema,
  haircut: yup.string().required('Obrigatório')
}
