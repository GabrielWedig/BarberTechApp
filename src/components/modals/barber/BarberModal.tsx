import { FieldValues, useForm } from 'react-hook-form'
import { SelectField, InputField, Option, TextareaField } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect, useState } from 'react'
import {
  CreateBarberRequest,
  UpdateBarberRequest,
  useBarbers,
  useEstablishments,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../../hooks'
import { Button, Visible } from '../..'
import { getBarberSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'

interface BarberModalProps {
  open: boolean
  onClose: () => void
  barberId?: string
}

type OptionsType = 'users' | 'establishments'

type Options = {
  [K in OptionsType]: Option[]
}

interface CreateFormData {
  establishmentId: string
  userId: string
  about?: string
  contact: string
  instagram?: string
  facebook?: string
  twitter?: string
}

interface UpdateFormData {
  establishmentId?: string
  about?: string
  contact?: string
  instagram?: string
  facebook?: string
  twitter?: string
}

export const BarberModal = ({ open, onClose, barberId }: BarberModalProps) => {
  const isEdit = !!barberId

  const [options, setOptions] = useState<Options>({
    establishments: [],
    users: []
  })

  const { getEstablishmentOptions } = useEstablishments()
  const { getUserOptions } = useUsers()
  const { createBarber, updateBarber, getBarberById } = useBarbers()

  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  useEffect(() => {
    if (!open) return

    fetchOptions()

    if (isEdit) {
      fetchData()
    }
  }, [open])

  const fetchOptions = async () => {
    const { data, error } = await usingTryCatch(
      Promise.all([getEstablishmentOptions(''), getUserOptions()])
    )

    if (error || !data?.[0] || !data?.[1]) {
      showErrorSnackbar(error)
      return
    }

    const options = {
      establishments: data[0].map((establishment) => ({
        name: establishment.name,
        value: establishment.id
      })),
      users: data[1].map((user) => ({
        name: user.name,
        value: user.id
      }))
    }

    setOptions(options)
  }

  const fetchData = async () => {
    const { data, error } = await usingTryCatch(getBarberById(barberId ?? ''))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    reset({
      about: data.about,
      contact: data.contact,
      establishmentId: data.establishmentId,
      facebook: data.social.facebook,
      instagram: data.social.instagram,
      twitter: data.social.twitter
    })
  }

  const { control, handleSubmit, reset } = useForm<
    CreateFormData | UpdateFormData
  >({
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
      social: social
    }

    const createRequest: CreateBarberRequest = {
      ...updateRequest,
      contact: values.contact ?? '',
      establishmentId: values.establishmentId ?? '',
      userId: values.userId ?? ''
    }

    const action = isEdit
      ? updateBarber(barberId, updateRequest)
      : createBarber(createRequest)

    const { error } = await usingTryCatch(action)

    if (error) {
      showErrorSnackbar(error)
      return
    }
    showSuccessSnackbar()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <S.BarberBox>
        <h3>{isEdit ? 'Editar barbeiro' : 'Criar novo barbeiro'}</h3>
        <form>
          <div className="box">
            <SelectField
              control={control}
              label="Estabelecimento"
              name="establishmentId"
              options={options?.establishments}
            />
            <Visible when={!isEdit}>
              <SelectField
                control={control}
                label="Usuário"
                name="userId"
                options={options?.users}
              />
            </Visible>
          </div>
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
