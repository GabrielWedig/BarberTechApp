import { FieldValues, useForm } from 'react-hook-form'
import { FileField, InputField, TextareaField } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect, useState } from 'react'
import {
  HaircutData,
  useHaircuts,
  useRequest,
  useSnackbarContext,
  usingTryCatch
} from '../../../hooks'
import { Button } from '../..'
import { getHaircutSchema } from './schema'
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
  const isEdit = !!haircutId

  const [file, setFile] = useState<File>()

  const { uploadImage } = useRequest('')
  const { createHaircut, updateHaircut, getHaircutById } = useHaircuts()
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  useEffect(() => {
    if (open) {
      fetchData()
    }
  }, [open])

  const fetchData = async () => {
    if (!isEdit) return

    const { data, error } = await usingTryCatch(getHaircutById(haircutId ?? ''))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    reset({
      name: data.name,
      about: data.about,
      price: data.price
    })
  }

  const { control, handleSubmit, reset } = useForm<
    CreateFormData | UpdateFormData
  >({
    resolver: yupResolver(getHaircutSchema(isEdit))
  })

  const handleModalSubmit = async (values: FieldValues) => {
    if (!file) return

    const { data: fileName, error: fileError } = await usingTryCatch(
      uploadImage(file)
    )

    if (fileError || !fileName) {
      showErrorSnackbar(fileError)
      return
    }

    const request = {
      name: values.name,
      about: values.about,
      price: values.price,
      imageSource: fileName
    }

    const action = isEdit
      ? updateHaircut(haircutId, request)
      : createHaircut(request)

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
      <S.HaircutBox>
        <h3>{isEdit ? 'Editar corte' : 'Criar novo corte'}</h3>
        <form>
          <InputField control={control} label="Nome" name="name" />
          <TextareaField control={control} label="Sobre" name="about" />
          <div className="box">
            <InputField
              control={control}
              label="Preço"
              name="price"
              type="number"
            />
            <FileField
              control={control}
              label="Imagem"
              name="imageSource"
              onChange={(file) => setFile(file)}
            />
          </div>
          <Button type="primary" onClick={handleSubmit(handleModalSubmit)}>
            Enviar
          </Button>
        </form>
      </S.HaircutBox>
    </Modal>
  )
}
