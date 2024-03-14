import { FieldValues, useForm } from 'react-hook-form'
import { FileField, InputField, SelectField } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect, useState } from 'react'
import {
  useEstablishments,
  useSnackbarContext,
  usingTryCatch
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

export const EstablishmentModal = ({
  open,
  onClose,
  establishmentId
}: EstablishmentModalProps) => {
  const isEdit = !!establishmentId

  const [file, setFile] = useState<File>()

  const { createEstablishment, updateEstablishment, getEstablishmentById } =
    useEstablishments()

  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  useEffect(() => {
    if (open) {
      fetchData()
    }
  }, [open])

  const fetchData = async () => {
    if (!isEdit) return

    const { data, error } = await usingTryCatch(
      getEstablishmentById(establishmentId ?? '')
    )

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }

    reset({
      address: data.address,
      lunchInterval: data.lunchInterval,
      lunchTime: data.lunchTime,
      openTime: data.openTime,
      workInterval: data.workInterval
    })
  }

  const { control, handleSubmit, reset } = useForm<
    CreateFormData | UpdateFormData
  >({
    resolver: yupResolver(getEstablishmentSchema(isEdit))
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

    const action = isEdit
      ? updateEstablishment(establishmentId, request)
      : createEstablishment(request)

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
      <S.EstablishmentBox>
        <h3>
          {isEdit ? 'Editar estabelecimento' : 'Criar novo estabelecimento'}
        </h3>
        <form>
          <InputField control={control} label="Endereço" name="address" />
          <FileField
            label="Imagem"
            control={control}
            name="imageSource"
            onChange={(file) => setFile(file)}
          />
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
