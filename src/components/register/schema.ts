import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  name: yup.string().required('Obrigatório'),
  email: yup.string().email().required('Obrigatório'),
  password: yup
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(/[0-9]/, 'Senha deve ter um número')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Senha deve ter um caracter especial'
    )
    .matches(/[A-Z]/, 'Senha deve ter uma letra maiúscula')
    .required('Obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não são iguais')
    .required('Obrigatório')
})
