import { FieldValues, useForm } from 'react-hook-form'
import { Button, ModalTypes, TextField } from '..'
import * as S from './style'
import { useUsers, usingTryCatch } from '../../hooks'

interface LoginProps {
  setModalType: (type: ModalTypes) => void
  onClose: () => void
}

interface LoginFormData {
  email: string
  password: string
}

export const Login = ({ setModalType, onClose }: LoginProps) => {
  const { handleSubmit, control } = useForm<LoginFormData>()

  const { login } = useUsers()

  const handleLoginSubmit = async (values: FieldValues) => {
    const request = {
      email: values.email,
      password: values.password
    }

    const { error, data } = await usingTryCatch(login(request))

    console.log(data)

    if (error) {
      return
      // chama modal
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
        <TextField
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
        <a onClick={() => setModalType('register')}>Registre-se</a>
      </div>
    </S.LoginBox>
  )
}
