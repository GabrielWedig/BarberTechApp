import { FieldValues, useForm } from 'react-hook-form'
import { Button, ModalTypes, TextField } from '..'
import * as S from './style'

interface LoginProps {
  setModalType: (type: ModalTypes) => void
}

interface LoginFormData {
  email: string
  password: string
}

export const Login = ({ setModalType }: LoginProps) => {
  const { handleSubmit, control } = useForm<LoginFormData>()

  const handleLoginSubmit = (data: FieldValues) => {
    console.log(data)
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
        <a
          onClick={() => setModalType('forgot')}
          className="forgot-password"
        >
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
