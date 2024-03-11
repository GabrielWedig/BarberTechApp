import { FieldValues, useForm } from 'react-hook-form'
import { Button, ModalTypes, PasswordField, TextField, Visible } from '../..'
import * as S from './style'
import { useEffect, useState } from 'react'
import {
  UserData,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../../hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { getUserSchema } from './schema'

interface UserModalProps {
  onClose: () => void
  setModalType?: (type: ModalTypes) => void
  userId?: string
}

interface CreateFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface UpdateFormData {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export const UserModal = ({
  onClose,
  setModalType,
  userId
}: UserModalProps) => {
  const isClientModal = !!setModalType
  const isNew = !userId

  const [user, setUser] = useState<UserData>()

  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()
  const { register, updateUser, getUserById } = useUsers()

  const { handleSubmit, control } = useForm<CreateFormData | UpdateFormData>({
    resolver: yupResolver(getUserSchema(isNew)),
    defaultValues: user
  })

  const invokeSetModalType = (type: ModalTypes) =>
    isClientModal ? setModalType(type) : undefined

  useEffect(() => {
    return () => invokeSetModalType('login')
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    if (isNew) return

    const { data, error } = await usingTryCatch(getUserById(userId ?? ''))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setUser(data)
  }

  const handleUserSubmit = async (values: FieldValues) => {
    const request = {
      email: values.email,
      password: values.password,
      name: values.name
    }

    const action = isNew ? register(request) : updateUser(userId, request)

    const { error } = await usingTryCatch(action)

    if (error) {
      showErrorSnackbar(error)
      return
    }

    showSuccessSnackbar('Cadastro realizado!')
    onClose()
  }

  return (
    <S.UserModalBox>
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
        <Button type="primary" onClick={handleSubmit(handleUserSubmit)}>
          Concluir cadastro
        </Button>
      </form>
      <Visible when={isClientModal}>
        <div>
          <span>Já tem uma conta?</span>
          <a onClick={() => invokeSetModalType('login')}>Fazer login</a>
        </div>
      </Visible>
    </S.UserModalBox>
  )
}
