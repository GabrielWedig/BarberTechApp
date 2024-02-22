import { FieldValues, useForm } from 'react-hook-form'
import { Button, ModalTypes, PasswordField, TextField } from '..'
import * as S from './style'
import { useEffect } from 'react'
import { useSnackbarContext, useUsers, usingTryCatch } from '../../hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from './schema'

interface RegisterProps {
  setModalType: (type: ModalTypes) => void
  onClose: () => void
}

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const Register = ({ setModalType, onClose }: RegisterProps) => {
  const { handleSubmit, control } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema)
  })
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  const { register } = useUsers()

  useEffect(() => {
    return () => setModalType('login')
  })

  const handleRegisterSubmit = async (values: FieldValues) => {
    const request = {
      email: values.email,
      password: values.password,
      name: values.name
    }

    const { error } = await usingTryCatch(register(request))

    if (error) {
      showErrorSnackbar(error)
      return
    }

    showSuccessSnackbar('Cadastro realizado!')
    onClose()
  }

  return (
    <S.RegisterBox>
      <h3>Cadastro</h3>
      <form>
        <TextField
          name="name"
          control={control}
          label="Nome completo:"
          placeholder="Digite seu nome"
        />
        <TextField
          name="email"
          control={control}
          label="E-mail:"
          placeholder="Digite seu e-mail"
        />
        <PasswordField
          name="password"
          control={control}
          label="Senha:"
          placeholder="Digite sua senha"
        />
        <PasswordField
          name="confirmPassword"
          control={control}
          label="Confirme senha:"
          placeholder="Confirme a senha"
        />
        <Button type="primary" onClick={handleSubmit(handleRegisterSubmit)}>
          Concluir cadastro
        </Button>
      </form>
      <div>
        <span>Já tem uma conta?</span>
        <a onClick={() => setModalType('login')}>Fazer login</a>
      </div>
    </S.RegisterBox>
  )
}
