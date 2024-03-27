import { FieldValues, useForm } from 'react-hook-form'
import {
  Button,
  FileField,
  InputField,
  Visible,
  TextareaField
} from '../../../components'
import {
  UserData,
  useBarbers,
  useRequest,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../../hooks'
import * as S from './style'
import { getSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import userImage from '../../../img/user.png'
import { useEffect, useState } from 'react'

interface EditProps {
  isEdit: boolean
  user: UserData | null
}

interface FormData {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  image?: File
  about?: string
  contact?: string
  instagram?: string
  facebook?: string
  twitter?: string
}

export const Edit = ({ isEdit, user }: EditProps) => {
  const [file, setFile] = useState<File>()

  const { uploadImage } = useRequest('')
  const { updateUser } = useUsers()
  const { getBarberById, updateBarber } = useBarbers()
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  useEffect(() => {
    if (user?.type === 'Barber' && user.barberId) {
      fetchBarber(user.barberId)
    }

    reset({
      name: user?.name,
      email: user?.email
    })
  }, [user])

  const fetchBarber = async (barberId: string) => {
    const { data, error } = await usingTryCatch(getBarberById(barberId))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }

    reset({
      about: data.about,
      contact: data.contact,
      instagram: data.social.instagram,
      twitter: data.social.twitter,
      facebook: data.social.facebook
    })
  }

  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: yupResolver(getSchema(user?.type === 'Barber'))
  })

  const handleFormSubmit = async (values: FieldValues) => {
    const fileName = await handleUploadImage()

    const userRequest = {
      email: values.email,
      password: values.password,
      name: values.name,
      imageSource: fileName
    }

    const barberRequest = {
      about: values.about,
      contact: values.contact,
      social: {
        instagram: values.instagram,
        twitter: values.twitter,
        facebook: values.facebook
      }
    }

    const { error } = await usingTryCatch(
      Promise.all([
        updateUser(user?.id ?? '', userRequest),
        updateBarber(user?.barberId ?? '', barberRequest)
      ])
    )

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
        <Visible when={user?.type === 'Barber'}>
          <TextareaField
            disabled={!isEdit}
            control={control}
            label="Sobre"
            name="about"
          />
          <InputField
            disabled={!isEdit}
            control={control}
            label="Instagram"
            name="instagram"
          />
          <InputField
            disabled={!isEdit}
            control={control}
            label="Twitter"
            name="twitter"
          />
          <InputField
            disabled={!isEdit}
            control={control}
            label="Facebook"
            name="facebook"
          />
          <InputField
            disabled={!isEdit}
            control={control}
            label="Contato"
            name="contact"
          />
        </Visible>
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
