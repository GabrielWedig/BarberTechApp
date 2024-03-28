import { FieldValues, useForm } from 'react-hook-form'
import { Button, ModalTypes, InputField } from '../..'
import * as S from './style'
import { useSnackbarContext, useUsers, useTryCatch } from '../../../hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from './schema'

interface LoginProps {
  setModalType: (type: ModalTypes) => void
  onClose: () => void
}

interface LoginFormData {
  email: string
  password: string
}

export const Login = ({ setModalType, onClose }: LoginProps) => {
  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  })

  const { login } = useUsers()
  const { fetchData } = useTryCatch()

  const handleLoginSubmit = async (values: FieldValues) => {
    const request = {
      email: values.email,
      password: values.password
    }

    await fetchData(login(request))
    onClose()
  }

  return (
    <S.LoginBox>
      <h3>Login</h3>
      <form>
        <InputField
          name="email"
          control={control}
          label="E-mail"
          placeholder="Digite seu e-mail"
        />
        <InputField
          name="password"
          control={control}
          label="Senha:"
          placeholder="Digite sua senha"
          type="password"
        />
        <Button type="primary" onClick={handleSubmit(handleLoginSubmit)}>
          Fazer Login
        </Button>
      </form>
      <div>
        <span>Não tem uma conta?</span>
        <a onClick={() => setModalType('registerClient')}>Registre-se</a>
      </div>
    </S.LoginBox>
  )
}
