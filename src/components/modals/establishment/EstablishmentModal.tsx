import { FieldValues, useForm } from 'react-hook-form'
import { TextField } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect, useState } from 'react'
import {
  EstablishmentData,
  useEstablishments,
  useSnackbarContext,
  usingTryCatch
} from '../../../hooks'
import { Button } from '../..'
import { getDefaultEstablishmentValues, getEstablishmentSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'

interface EstablishmentModalProps {
  open: boolean
  onClose: () => void
  establishmentId?: string
}

interface CreateFormData {
  address: string
  imageSource: string
  openTime: string
  lunchTime: string
  workInterval: string
  lunchInterval: string
}

interface UpdateFormData {
  address?: string
  imageSource?: string
  openTime?: string
  lunchTime?: string
  workInterval?: string
  lunchInterval?: string
}

export const EstablishmentModal = ({
  open,
  onClose,
  establishmentId
}: EstablishmentModalProps) => {
  const isNew = !establishmentId

  const [establishment, setEstablishment] = useState<EstablishmentData>()

  const { createEstablishment, updateEstablishment, getEstablishmentById } =
    useEstablishments()

  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  useEffect(() => {
    if (open) {
      fetchData()
    }
  }, [])

  const fetchData = async () => {
    if (isNew) return

    const { data, error } = await usingTryCatch(
      getEstablishmentById(establishmentId ?? '')
    )

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setEstablishment(data)
  }

  const { control, handleSubmit } = useForm<CreateFormData | UpdateFormData>({
    resolver: yupResolver(getEstablishmentSchema(isNew)),
    defaultValues: getDefaultEstablishmentValues(establishment)
  })

  const handleModalSubmit = async (values: FieldValues) => {
    const request = {
      address: values.address,
      imageSource: values.imageSource,
      openTime: values.openTime,
      lunchTime: values.lunchTime,
      workInterval: values.workInterval,
      lunchInterval: values.lunchInterval
    }

    const action = isNew
      ? createEstablishment(request)
      : updateEstablishment(establishmentId, request)

    const { error } = await usingTryCatch(action)

    if (error) {
      showErrorSnackbar(error)
      return
    }
    showSuccessSnackbar()
    onClose()
  }

  // TODO: upar imagem no vercel e depois passar o link para imageSource sem campo de texto / campo de imagem
  // horários vai ser um select com as opções
  return (
    <Modal open={open} onClose={onClose}>
      <S.EstablishmentBox>
        <h3>
          {isNew ? 'Criar novo estabelecimento' : 'Editar estabelecimento'}
        </h3>
        <form>
          <TextField control={control} label="Endereço" name="address" />
          <TextField control={control} label="Imagem URL" name="imageSource" />
          <TextField
            control={control}
            label="Horário de abertura"
            name="openTime"
          />
          <TextField
            control={control}
            label="Horário de almoço"
            name="lunchTime"
          />
          <TextField
            control={control}
            label="Intervalo de trabalho"
            name="workInterval"
          />
          <TextField
            control={control}
            label="Intervalo de almoço"
            name="lunchInterval"
          />
          <Button type="primary" onClick={handleSubmit(handleModalSubmit)}>
            Enviar
          </Button>
        </form>
      </S.EstablishmentBox>
    </Modal>
  )
}
