import { FieldValues, useForm } from 'react-hook-form'
import { Button, ModalTypes, PasswordField, TextField } from '..'
import * as S from './style'
import { useSnackbarContext, useUsers, usingTryCatch } from '../../hooks'
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

  const { showErrorSnackbar } = useSnackbarContext()
  const { login } = useUsers()

  const handleLoginSubmit = async (values: FieldValues) => {
    const request = {
      email: values.email,
      password: values.password
    }

    const { error } = await usingTryCatch(login(request))

    if (error) {
      showErrorSnackbar(error)
      return
    }
    onClose()
  }

  return (
    <S.LoginBox>
      <h3>Login</h3>
      <form>
        <TextField
          name="email"
          control={control}
          label="E-mail"
          placeholder="Digite seu e-mail"
        />
        <PasswordField
          name="password"
          control={control}
          label="Senha:"
          placeholder="Digite sua senha"
        />
        <a onClick={() => setModalType('forgot')} className="forgot-password">
          Esqueceu a senha?
        </a>
        <Button type="primary" onClick={handleSubmit(handleLoginSubmit)}>
          Fazer Login
        </Button>
      </form>
      <div>
        <span>Não tem uma conta?</span>
        <a onClick={() => setModalType('register-client')}>Registre-se</a>
      </div>
    </S.LoginBox>
  )
}
