import { FieldValues, useForm } from 'react-hook-form'
import { InputField, Option, TextareaField, FileField } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect } from 'react'
import {
  CreateBarberRequest,
  UpdateBarberRequest,
  useBarbers,
  useEstablishments,
  useUsers,
  useTryCatch,
  BarberData
} from '../../../hooks'
import { Button, Visible } from '../..'
import { getBarberSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { AutocompleteField } from '../../fields/autocomplete/AutocompleteField'

interface BarberModalProps {
  open: boolean
  onClose: () => void
  barberId?: string
}

type OptionsType = 'users' | 'establishments'

type Options = {
  [K in OptionsType]: Option[]
}

interface FormData {
  establishmentId?: string
  userId?: string
  about?: string
  contact?: string
  instagram?: string
  facebook?: string
  twitter?: string
  imageSource?: string
}

export const BarberModal = ({ open, onClose, barberId }: BarberModalProps) => {
  const isEdit = !!barberId

  const { getEstablishmentOptions } = useEstablishments()
  const { getUserOptions } = useUsers()
  const { createBarber, updateBarber, getBarberById } = useBarbers()
  const { fetchData, fetchAndReset, fetchAndMapOptions } = useTryCatch()

  useEffect(() => {
    if (open && isEdit) {
      fetchDataInternal()
    }
    return () => reset()
  }, [open])

  const fetchOptions = async (type: OptionsType, searchTerm?: string) => {
    const action =
      type === 'users'
        ? getUserOptions(searchTerm)
        : getEstablishmentOptions(searchTerm)

    return await fetchAndMapOptions(action)
  }

  const fetchDataInternal = async () =>
    await fetchAndReset(getBarberById(barberId ?? ''), resetBarber)

  const resetBarber = (data: BarberData) =>
    reset({
      about: data.about,
      contact: data.contact,
      establishmentId: data.establishmentId,
      facebook: data.social.facebook,
      instagram: data.social.instagram,
      twitter: data.social.twitter,
      imageSource: data.imageSource
    })

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(getBarberSchema(isEdit))
  })

  const handleModalSubmit = async (values: FieldValues) => {
    const social = {
      instagram: values.instagram,
      facebook: values.facebook,
      twitter: values.twitter
    }

    const updateRequest: UpdateBarberRequest = {
      establishmentId: values.establishmentId,
      about: values.about,
      contact: values.contact,
      imageSource: values.imageSource,
      social: social
    }

    const createRequest: CreateBarberRequest = {
      ...updateRequest,
      contact: values.contact ?? '',
      establishmentId: values.establishmentId ?? '',
      userId: values.userId ?? '',
      imageSource: values.imageSource ?? ''
    }

    const action = isEdit
      ? updateBarber(barberId, updateRequest)
      : createBarber(createRequest)

    await fetchData(action)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <S.BarberBox>
        <h3>{isEdit ? 'Editar barbeiro' : 'Criar novo barbeiro'}</h3>
        <form>
          <div className="box">
            <AutocompleteField
              control={control}
              label="Estabelecimento"
              name="establishmentId"
              search={(searchTerm) =>
                fetchOptions('establishments', searchTerm)
              }
            />
            <Visible when={!isEdit}>
              <AutocompleteField
                control={control}
                label="Usuário"
                name="userId"
                search={(searchTerm) => fetchOptions('users', searchTerm)}
              />
            </Visible>
          </div>
          <FileField control={control} label="Imagem" name="imageSource" />
          <TextareaField control={control} label="Sobre" name="about" />
          <InputField control={control} label="Instagram" name="instagram" />
          <InputField control={control} label="Twitter" name="twitter" />
          <InputField control={control} label="Facebook" name="facebook" />
          <InputField control={control} label="Contato" name="contact" />
          <Button type="primary" onClick={handleSubmit(handleModalSubmit)}>
            Enviar
          </Button>
        </form>
      </S.BarberBox>
    </Modal>
  )
}
