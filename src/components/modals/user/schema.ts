import * as yup from 'yup'

export const getUserSchema = (isCreate: boolean) =>
  yup.object().shape(isCreate ? createSchema : commomSchema)

const commomSchema = {
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

const createSchema = {
  ...commomSchema,
  name: commomSchema.name.required(),
  email: commomSchema.email.required(),
  password: commomSchema.password.required(),
  confirmPassword: commomSchema.confirmPassword.required()
}
