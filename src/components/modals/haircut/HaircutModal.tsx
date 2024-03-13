import { FieldValues, useForm } from 'react-hook-form'
import { TextField } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect, useState } from 'react'
import {
  HaircutData,
  useHaircuts,
  useSnackbarContext,
  usingTryCatch
} from '../../../hooks'
import { Button } from '../..'
import { getDefaultHaircutValues, getHaircutSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'

interface HaircutModalProps {
  open: boolean
  onClose: () => void
  haircutId?: string
}

interface CreateFormData {
  name: string
  about?: string
  price: number
  imageSource: string
}

interface UpdateFormData {
  name?: string
  about?: string
  price?: number
  imageSource?: string
}

export const HaircutModal = ({
  open,
  onClose,
  haircutId
}: HaircutModalProps) => {
  const isNew = !haircutId

  const [haircut, setHaircut] = useState<HaircutData>()

  const { createHaircut, updateHaircut, getHaircutById } = useHaircuts()

  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  useEffect(() => {
    if (open) {
      fetchData()
    }
  }, [])

  const fetchData = async () => {
    if (isNew) return

    const { data, error } = await usingTryCatch(getHaircutById(haircutId ?? ''))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setHaircut(data)
  }

  const { control, handleSubmit } = useForm<CreateFormData | UpdateFormData>({
    resolver: yupResolver(getHaircutSchema(isNew)),
    defaultValues: getDefaultHaircutValues(haircut)
  })

  const handleModalSubmit = async (values: FieldValues) => {
    const request = {
      name: values.name,
      about: values.about,
      price: values.price,
      imageSource: values.imageSource
    }

    const action = isNew
      ? createHaircut(request)
      : updateHaircut(haircutId, request)

    const { error } = await usingTryCatch(action)

    if (error) {
      showErrorSnackbar(error)
      return
    }
    showSuccessSnackbar()
    onClose()
  }

  // TODO: upar imagem no vercel e depois passar o link para imageSource sem campo de texto / campo de imagem
  // criar campo de número
  return (
    <Modal open={open} onClose={onClose}>
      <S.HaircutBox>
        <h3>{isNew ? 'Criar novo corte' : 'Editar corte'}</h3>
        <form>
          <TextField control={control} label="Nome" name="name" />
          <TextField control={control} label="Sobre" name="about" />
          <TextField control={control} label="Preço" name="price" />
          <TextField control={control} label="Imagem URL" name="imageSource" />
        </form>
        <Button type="primary" onClick={handleSubmit(handleModalSubmit)}>
          Enviar
        </Button>
      </S.HaircutBox>
    </Modal>
  )
}
