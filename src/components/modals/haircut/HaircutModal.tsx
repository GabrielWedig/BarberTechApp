import { FieldValues, useForm } from 'react-hook-form'
import { FileField, InputField, NumberField, TextareaField } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect, useState } from 'react'
import {
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

interface FileData {
  file: File | null
  name: string | null
}

export const HaircutModal = ({
  open,
  onClose,
  haircutId
}: HaircutModalProps) => {
  const isEdit = !!haircutId

  const [fileData, setFileData] = useState<FileData>({ name: null, file: null })

  const { uploadImage } = useRequest('')
  const { createHaircut, updateHaircut, getHaircutById } = useHaircuts()
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  useEffect(() => {
    if (open && isEdit) {
      fetchData()
    }
    return () => resetAll()
  }, [open])

  const resetAll = () => {
    reset()
    setFileData({ name: null, file: null })
  }

  const fetchData = async () => {
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
    setFileData((current) => ({ ...current, name: data.imageSource }))
  }

  const { control, handleSubmit, reset } = useForm<
    CreateFormData | UpdateFormData
  >({
    resolver: yupResolver(getHaircutSchema(isEdit))
  })

  const handleModalSubmit = async (values: FieldValues) => {
    const fileName = await handleUploadImage()

    const request = {
      name: values.name,
      about: values.about,
      price: values.price,
      imageSource: fileName ?? fileData.name ?? ''
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

  const handleUploadImage = async () => {
    if (!fileData.file) return

    const { data, error } = await usingTryCatch(uploadImage(fileData.file))

    if (!data || error) {
      showErrorSnackbar(error)
      return
    }
    return data
  }

  return (
    <Modal open={open} onClose={onClose}>
      <S.HaircutBox>
        <h3>{isEdit ? 'Editar corte' : 'Criar novo corte'}</h3>
        <form>
          <InputField control={control} label="Nome" name="name" />
          <TextareaField control={control} label="Sobre" name="about" />
          <div className="box">
            <NumberField
              control={control}
              label="Preço"
              name="price"
              isCurency={true}
            />
            <FileField
              control={control}
              label="Imagem"
              name="imageSource"
              onChange={(file) =>
                setFileData((current) => ({ ...current, file }))
              }
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
