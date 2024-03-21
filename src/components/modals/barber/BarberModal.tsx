import { FieldValues, useForm } from 'react-hook-form'
import { InputField, Option, TextareaField, FileField } from '../../fields'
import { Modal } from '../base/Modal'
import * as S from './style'
import { useEffect, useState } from 'react'
import {
  CreateBarberRequest,
  UpdateBarberRequest,
  useBarbers,
  useEstablishments,
  useRequest,
  useSnackbarContext,
  useUsers,
  usingTryCatch
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

interface FileData {
  file: File | null
  name: string | null
}

export const BarberModal = ({ open, onClose, barberId }: BarberModalProps) => {
  const isEdit = !!barberId

  const [fileData, setFileData] = useState<FileData>({ name: null, file: null })

  const { getEstablishmentOptions } = useEstablishments()
  const { getUserOptions } = useUsers()
  const { uploadImage } = useRequest('')
  const { createBarber, updateBarber, getBarberById } = useBarbers()

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

  const fetchOptions = async (type: OptionsType, searchTerm?: string) => {
    const action =
      type === 'users'
        ? getUserOptions(searchTerm)
        : getEstablishmentOptions(searchTerm)

    const { data, error } = await usingTryCatch(action)

    if (error || !data) {
      showErrorSnackbar(error)
      return []
    }

    return data.map((d) => ({ name: d.name, value: d.id }))
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
    setFileData((current) => ({ ...current, name: data.imageSource }))
  }

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(getBarberSchema(isEdit))
  })

  const handleModalSubmit = async (values: FieldValues) => {
    const fileName = await handleUploadImage()

    const social = {
      instagram: values.instagram,
      facebook: values.facebook,
      twitter: values.twitter
    }

    const updateRequest: UpdateBarberRequest = {
      establishmentId: values.establishmentId,
      about: values.about,
      contact: values.contact,
      social: social,
      imageSource: fileName ?? fileData.name ?? ''
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
          <FileField
            control={control}
            name="imageSource"
            onChange={(file) =>
              setFileData((current) => ({ ...current, file }))
            }
          />
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
