import { FieldValues, useForm } from 'react-hook-form'
import { FileField, InputField, SelectField } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect } from 'react'
import {
  EstablishmentData,
  useEstablishments,
  useTryCatch
} from '../../../hooks'
import { Button } from '../..'
import { getEstablishmentSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { intervalOptions, timeOptions } from './options'

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

interface FileData {
  file: File | null
  name: string | null
}

export const EstablishmentModal = ({
  open,
  onClose,
  establishmentId
}: EstablishmentModalProps) => {
  const isEdit = !!establishmentId

  const { createEstablishment, updateEstablishment, getEstablishmentById } =
    useEstablishments()
  const { fetchData, fetchAndReset } = useTryCatch()

  useEffect(() => {
    if (open && isEdit) {
      fetchDataInternal()
    }
    return () => reset()
  }, [open])

  const fetchDataInternal = async () =>
    await fetchAndReset(
      getEstablishmentById(establishmentId ?? ''),
      resetEstablishment
    )

  const resetEstablishment = (data: EstablishmentData) =>
    reset({
      address: data.address,
      lunchInterval: data.lunchInterval,
      lunchTime: data.lunchTime,
      openTime: data.openTime,
      workInterval: data.workInterval,
      imageSource: data.imageSource
    })

  const { control, handleSubmit, reset } = useForm<
    CreateFormData | UpdateFormData
  >({
    resolver: yupResolver(getEstablishmentSchema(isEdit))
  })

  const handleModalSubmit = async (values: FieldValues) => {
    const request = {
      address: values.address,
      openTime: values.openTime,
      lunchTime: values.lunchTime,
      workInterval: values.workInterval,
      lunchInterval: values.lunchInterval,
      imageSource: values.imageSource
    }

    const action = isEdit
      ? updateEstablishment(establishmentId, request)
      : createEstablishment(request)

    await fetchData(action)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <S.EstablishmentBox>
        <h3>
          {isEdit ? 'Editar estabelecimento' : 'Criar novo estabelecimento'}
        </h3>
        <form>
          <InputField control={control} label="Endereço" name="address" />
          <FileField label="Imagem" control={control} name="imageSource" />
          <div className="box">
            <SelectField
              control={control}
              options={timeOptions}
              label="Horário de abertura"
              name="openTime"
            />
            <SelectField
              control={control}
              options={timeOptions}
              label="Horário de almoço"
              name="lunchTime"
            />
          </div>
          <div className="box">
            <SelectField
              control={control}
              options={intervalOptions}
              label="Intervalo de trabalho"
              name="workInterval"
            />
            <SelectField
              control={control}
              options={intervalOptions}
              label="Intervalo de almoço"
              name="lunchInterval"
            />
          </div>
          <Button type="primary" onClick={handleSubmit(handleModalSubmit)}>
            Enviar
          </Button>
        </form>
      </S.EstablishmentBox>
    </Modal>
  )
}
