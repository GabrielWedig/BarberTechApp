import * as yup from 'yup'

export const getSchema = (isBarber: boolean) => {
  return yup
    .object()
    .shape(isBarber ? { ...userSchema, ...barberSchema } : userSchema)
}

const userSchema = {
  name: yup.string(),
  email: yup.string().email(),
  password: yup
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(/[0-9]/, 'Senha deve ter um número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve ter um caracter especial')
    .matches(/[A-Z]/, 'Senha deve ter uma letra maiúscula'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não são iguais')
}

const barberSchema = {
  establishmentId: yup.string(),
  about: yup.string(),
  contact: yup.string(),
  instagram: yup.string(),
  twitter: yup.string(),
  facebook: yup.string()
}
