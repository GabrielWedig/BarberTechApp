import { FieldValues, useForm } from 'react-hook-form'
import { SelectField, TextField, Option } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect, useState } from 'react'
import {
  BarberData,
  CreateBarberRequest,
  UpdateBarberRequest,
  useBarbers,
  useEstablishments,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../../hooks'
import { Button, Visible } from '../..'
import { getBarberSchema, getDefaultBarberValues } from './schema'
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
  const isNew = !barberId

  const [options, setOptions] = useState<Options>({
    establishments: [],
    users: []
  })
  const [barber, setBarber] = useState<BarberData>()

  const { getEstablishmentOptions } = useEstablishments()
  const { getUserOptions } = useUsers()
  const { createBarber, updateBarber, getBarberById } = useBarbers()

  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  useEffect(() => {
    if(!open) return

    fetchOptions()
    
    if (!isNew) {
      fetchData()
    }
  }, [])

  const fetchOptions = async () => {
    const { data, error } = await usingTryCatch(
      Promise.all([getEstablishmentOptions(), getUserOptions()])
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
    setBarber(data)
  }

  const { control, handleSubmit } = useForm<CreateFormData | UpdateFormData>({
    resolver: yupResolver(getBarberSchema(isNew)),
    defaultValues: getDefaultBarberValues(barber)
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

    const action = isNew
      ? createBarber(createRequest)
      : updateBarber(barberId, updateRequest)

    const { error } = await usingTryCatch(action)

    if (error) {
      showErrorSnackbar(error)
      return
    }
    showSuccessSnackbar('Corte agendado com sucesso!')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <S.BarberBox>
        <h3>{isNew ? 'Criar novo barbeiro' : 'Editar barbeiro'}</h3>
        <form>
          <SelectField
            control={control}
            label="Estabelecimento"
            name="establishmentId"
            options={options?.establishments}
          />
          <Visible when={isNew}>
            <SelectField
              control={control}
              label="Usuário"
              name="userId"
              options={options?.users}
            />
          </Visible>
          <TextField control={control} label="Sobre" name="about" />
          <TextField control={control} label="Instagram" name="instagram" />
          <TextField control={control} label="Twitter" name="twitter" />
          <TextField control={control} label="Facebook" name="facebook" />
          <TextField control={control} label="Contato" name="contact" />
          <Button type="primary" onClick={handleSubmit(handleModalSubmit)}>
            Enviar
          </Button>
        </form>
      </S.BarberBox>
    </Modal>
  )
}
