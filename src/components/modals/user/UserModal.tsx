import { FieldValues, useForm } from 'react-hook-form'
import { Button, FileField, InputField, ModalTypes, Visible } from '../..'
import * as S from './style'
import { useEffect, useState } from 'react'
import {
  useRequest,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../../hooks'
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
  image?: File
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

  const [file, setFile] = useState<File>()

  const { uploadImage } = useRequest('')
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
    const fileName = await handleUploadImage()
    
    const request = {
      email: values.email,
      password: values.password,
      name: values.name,
      imageSource: fileName
    }

    const signIn = type === 'registerClient'

    const action = isEdit
      ? updateUser(userId, request)
      : register(request, signIn)

    const { error } = await usingTryCatch(action)

    if (error) {
      showErrorSnackbar(error)
      return
    }

    showSuccessSnackbar('Cadastro realizado!')
    onClose()
  }

  const handleUploadImage = async () => {
    if (!file) return

    const { data, error } = await usingTryCatch(uploadImage(file))

    if (!data || error) {
      showErrorSnackbar(error)
      return data
    }
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
        <FileField
          control={control}
          name="image"
          label="Imagem"
          onChange={(file) => setFile(file)}
        />
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
