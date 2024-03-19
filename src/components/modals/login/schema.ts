import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Por favor, insira um endereço de e-mail válido')
    .required('Obrigatório'),
  password: yup.string().required('Obrigatório')
})
