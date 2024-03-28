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
  useUsers,
  useTryCatch,
  BarberData
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
  imageSource?: string
  about?: string
  contact?: string
  instagram?: string
  facebook?: string
  twitter?: string
}

export const Edit = ({ isEdit, user }: EditProps) => {
  const { updateUser } = useUsers()
  const { getBarberById, updateBarber } = useBarbers()
  const { fetchWithMessage, fetchAndReset } = useTryCatch()

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
    await fetchAndReset(getBarberById(barberId), resetBarber)
  }

  const resetBarber = (data: BarberData) =>
    reset({
      about: data?.about,
      contact: data?.contact,
      instagram: data?.social.instagram,
      twitter: data?.social.twitter,
      facebook: data?.social.facebook
    })

  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: yupResolver(getSchema(user?.type === 'Barber'))
  })

  const handleFormSubmit = async (values: FieldValues) => {
    const userRequest = {
      email: values.email,
      password: values.password,
      name: values.name,
      imageSource: values.imageSource
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

    const calls = [
      updateUser(user?.id ?? '', userRequest),
      updateBarber(user?.barberId ?? '', barberRequest)
    ]

    await fetchWithMessage(Promise.all(calls), 'Cadastro realizado!')
  }

  const getImageSource = () => {
    //if (file) return URL.createObjectURL(file)
    if (user?.imageSource) return user.imageSource
    else return userImage
  }

  return (
    <S.EditBox>
      <div className="left-column">
        <h2>Configurações da conta</h2>
        <S.UserPhoto url={getImageSource()}>
          <Visible when={isEdit}>
            <FileField control={control} name="imageSource" type="secondary" />
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
