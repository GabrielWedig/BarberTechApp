import { FieldValues, useForm } from 'react-hook-form'
import { Button, FileField, InputField, ModalTypes, Visible } from '../..'
import * as S from './style'
import { useEffect } from 'react'
import { useUsers, useTryCatch, UserData, useRequest } from '../../../hooks'
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
  image?: File | null
  imageSource?: string
  password?: string
  confirmPassword?: string
}

export const UserModal = ({
  type,
  onClose,
  setModalType,
  userId
}: UserModalProps) => {
  const isClientModal = type === 'registerClient' && !!setModalType
  const isEdit = type === 'edit' && !!userId

  const { register, updateUser, getUserById } = useUsers()
  const { uploadImage } = useRequest('')
  const { fetchData, fetchAndReset, fetchWithMessage, fetchAndUploadImage } =
    useTryCatch()

  const invokeSetModalType = (type: ModalTypes) =>
    isClientModal ? setModalType(type) : undefined

  useEffect(() => {
    if (isEdit) {
      fetchDataInternal()
    }
    return () => invokeSetModalType('login')
  }, [])

  const fetchDataInternal = async () =>
    await fetchAndReset(getUserById(userId ?? ''), resetUser)

  const resetUser = (data: UserData) =>
    reset({ name: data.name, email: data.email, imageSource: data.imageSource })

  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: yupResolver(getUserSchema(isEdit))
  })

  const handleUserSubmit = async (values: FieldValues) => {
    const image = await fetchAndUploadImage(values.image, values.imageSource)

    const request = {
      email: values.email,
      password: values.password,
      name: values.name,
      imageSource: image
    }

    const signIn = type === 'registerClient'

    const action = isEdit
      ? updateUser(userId, request)
      : register(request, signIn)

    await fetchWithMessage(action, 'Cadastro realizado!')
    onClose()
  }

  return (
    <S.UserModalBox>
      <h3>Cadastro</h3>
      <form>
        <InputField
          name="name"
          control={control}
          label="Nome completo"
          placeholder="Digite seu nome"
        />
        <InputField
          name="email"
          control={control}
          label="E-mail"
          placeholder="Digite seu e-mail"
        />
        <FileField control={control} name="image" label="Imagem" />
        <InputField
          name="password"
          control={control}
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
        />
        <InputField
          name="confirmPassword"
          control={control}
          label="Confirme senha"
          placeholder="Confirme a senha"
          type="password"
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
