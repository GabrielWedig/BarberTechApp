import { FieldValues, useForm } from 'react-hook-form'
import { Button, ModalTypes, TextField } from '..'
import * as S from './style'

interface RegisterProps {
  setModalType: (type: ModalTypes) => void
}

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const Register = ({ setModalType }: RegisterProps) => {
  const { handleSubmit, control } = useForm<RegisterFormData>()

  const handleRegisterSubmit = (data: FieldValues) => {
    console.log(data)
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
        <TextField
          name="password"
          control={control}
          label="Senha:"
          placeholder="Digite sua senha"
        />
        <TextField
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
