import * as yup from 'yup'

export const scheduleSchema = yup.object().shape({
  name: yup.string(),
  barber: yup.string().required('Obrigatório'),
  date: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
      'Formato inválido. Use o formato dd/mm/yyyy'
    )
    .required('Obrigatório'),
  schedule: yup
    .string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      'Formato inválido. Use o formato hh:mm'
    )
    .required('Obrigatório')
})
