import { FieldValues, useForm } from 'react-hook-form'
import { Button, FileField, InputField, Visible } from '../../../components'
import {
  UserData,
  useRequest,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../../hooks'
import * as S from './style'
import { updateUserSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import userImage from '../../../img/user.png'
import { useEffect, useState } from 'react'

interface EditProps {
  isEdit: boolean
  user: UserData
}

interface FormData {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  image?: File
}

export const Edit = ({ isEdit, user }: EditProps) => {
  const [file, setFile] = useState<File>()

  const { uploadImage } = useRequest('')
  const { updateUser } = useUsers()
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  useEffect(() => {
    reset({
      name: user?.name,
      email: user?.email
    })
  }, [user])

  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: yupResolver(updateUserSchema)
  })

  const handleFormSubmit = async (values: FieldValues) => {
    const fileName = await handleUploadImage()

    const request = {
      email: values.email,
      password: values.password,
      name: values.name,
      imageSource: fileName
    }

    const { error } = await usingTryCatch(updateUser(user?.id, request))

    if (error) {
      showErrorSnackbar(error)
      return
    }
    showSuccessSnackbar('Cadastro realizado!')
  }

  const handleUploadImage = async () => {
    if (!file) return

    const { data, error } = await usingTryCatch(uploadImage(file))

    if (!data || error) {
      showErrorSnackbar(error)
      return
    }
    return data
  }

  const getImageSource = () => {
    if (file) return URL.createObjectURL(file)
    if (user?.imageSource) return user.imageSource
    else return userImage
  }

  return (
    <S.EditBox>
      <div className="left-column">
        <h2>Configurações da conta</h2>
        <S.UserPhoto url={getImageSource()}>
          <Visible when={isEdit}>
            <FileField
              control={control}
              name="image"
              type="secondary"
              onChange={(file) => setFile(file)}
            />
          </Visible>
        </S.UserPhoto>
        <p>O tamanho da imagem deve ser inferior a 10 MB</p>
      </div>
      <div className="rigth-column">
        <InputField
          disabled={!isEdit}
          control={control}
          label="Nome completo"
          name="name"
        />
        <InputField
          disabled={!isEdit}
          control={control}
          label="Email"
          name="email"
        />
        <InputField
          disabled={!isEdit}
          control={control}
          label="Senha"
          name="password"
          type="password"
        />
        <InputField
          disabled={!isEdit}
          control={control}
          label="Confirmar senha"
          name="confirmPassword"
          type="password"
        />
        <Button
          disabled={!isEdit}
          onClick={handleSubmit(handleFormSubmit)}
          type="secondary"
        >
          Salvar
        </Button>
      </div>
    </S.EditBox>
  )
}
