import * as yup from 'yup'

export const getUserSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? commomSchema : createSchema)

const commomSchema = {
  name: yup.string(),
  email: yup.string().email('Por favor, insira um endereço de e-mail válido'),
  imageSource: yup.string(),
  password: yup
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(/[0-9]/, 'Senha deve ter um número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve ter um caracter especial')
    .matches(/[A-Z]/, 'Senha deve ter uma letra maiúscula'),
  confirmPassword: yup
    .string()
    .when('password', ([password], schema) =>
      password && password.length > 0
        ? schema
            .required('Confirme sua senha')
            .oneOf([yup.ref('password')], 'As senhas não são iguais')
        : schema.nullable()
    )
}

const createSchema = {
  ...commomSchema,
  name: commomSchema.name.required('Obrigatório'),
  email: commomSchema.email.required('Obrigatório'),
  password: commomSchema.password.required('Obrigatório'),
  confirmPassword: commomSchema.confirmPassword.required('Obrigatório')
}
