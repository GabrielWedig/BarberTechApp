import { FieldValues, useForm } from 'react-hook-form'
import { Button, ModalTypes, PasswordField, TextField, Visible } from '../..'
import * as S from './style'
import { useEffect } from 'react'
import { useSnackbarContext, useUsers, usingTryCatch } from '../../../hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { getUserSchema } from './schema'

interface UserModalProps {
  type: ModalTypes
  onClose: () => void
  setModalType?: (type: ModalTypes) => void
  userId?: string
}

interface FormData {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export const UserModal = ({
  type,
  onClose,
  setModalType,
  userId
}: UserModalProps) => {
  const isClientModal = type === 'register-client' && !!setModalType
  const isEdit = type === 'edit' && !!userId

  const { register, updateUser, getUserById } = useUsers()
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  const invokeSetModalType = (type: ModalTypes) =>
    isClientModal ? setModalType(type) : undefined

  useEffect(() => {
    fetchData()
    return () => invokeSetModalType('login')
  }, [])

  const fetchData = async () => {
    if (!isEdit) return

    const { data, error } = await usingTryCatch(getUserById(userId ?? ''))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    reset({ name: data.name, email: data.email })
  }

  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: yupResolver(getUserSchema(isEdit))
  })

  const handleUserSubmit = async (values: FieldValues) => {
    const request = {
      email: values.email,
      password: values.password,
      name: values.name
    }

    const action = isEdit ? updateUser(userId, request) : register(request)

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
      </form>
      <Button type="primary" onClick={handleSubmit(handleUserSubmit)}>
        Concluir cadastro
      </Button>
      <Visible when={isClientModal}>
        <div>
          <span>Já tem uma conta?</span>
          <a onClick={() => invokeSetModalType('login')}>Fazer login</a>
        </div>
      </Visible>
    </S.UserModalBox>
  )
}
