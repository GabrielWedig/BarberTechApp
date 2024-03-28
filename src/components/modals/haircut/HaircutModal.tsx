import { FieldValues, useForm } from 'react-hook-form'
import { FileField, InputField, NumberField, TextareaField } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect } from 'react'
import { HaircutData, useHaircuts, useTryCatch } from '../../../hooks'
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

  const { createHaircut, updateHaircut, getHaircutById } = useHaircuts()
  const { fetchData, fetchAndReset } = useTryCatch()

  useEffect(() => {
    if (open && isEdit) {
      fetchDataInternal()
    }
    return () => reset()
  }, [open])

  const fetchDataInternal = async () =>
    await fetchAndReset(getHaircutById(haircutId ?? ''), resetHaircut)

  const resetHaircut = (data: HaircutData) =>
    reset({
      name: data.name,
      about: data.about,
      price: data.price,
      imageSource: data.imageSource
    })

  const { control, handleSubmit, reset } = useForm<
    CreateFormData | UpdateFormData
  >({
    resolver: yupResolver(getHaircutSchema(isEdit))
  })

  const handleModalSubmit = async (values: FieldValues) => {
    const request = {
      name: values.name,
      about: values.about,
      price: values.price,
      imageSource: values.imageSource
    }

    const action = isEdit
      ? updateHaircut(haircutId, request)
      : createHaircut(request)

    await fetchData(action)
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
            <FileField control={control} label="Imagem" name="imageSource" />
          </div>
          <Button type="primary" onClick={handleSubmit(handleModalSubmit)}>
            Enviar
          </Button>
        </form>
      </S.HaircutBox>
    </Modal>
  )
}
