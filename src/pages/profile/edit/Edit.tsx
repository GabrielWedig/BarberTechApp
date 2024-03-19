import { FieldValues, useForm } from 'react-hook-form'
import { Button, InputField } from '../../../components'
import { UserData } from '../../../hooks'
import * as S from './style'
import { updateUserSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import userImage from '../../../img/user.png'
import { AddAPhoto } from '@mui/icons-material'

interface EditProps {
  isEdit: boolean
  user?: UserData
}

interface FormData {
  name?: string | null
  email?: string | null
  password?: string | null
  confirmPassword?: string | null
}

export const Edit = ({ isEdit, user }: EditProps) => {
  const defaultValues = {
    name: user?.name,
    email: user?.email,
    password: null,
    confirmPassword: null
  }

  const { handleSubmit, control } = useForm<FormData>({
    resolver: yupResolver<FormData>(updateUserSchema),
    defaultValues: defaultValues
  })

  const handleFormSubmit = (data: FieldValues) => {}

  return (
    <S.EditBox>
      <div className="left-column">
        <h2>Configurações da conta</h2>
        <S.UserPhoto url={user?.imageSource ?? userImage}>
          <button className="photo-button">
            <AddAPhoto fontSize="large" />
          </button>
        </S.UserPhoto>
        <p>O tamanho da imagem deve ser inferior a 10 MB</p>
      </div>
      <div className="rigth-column">
        <InputField
          disabled={!isEdit}
          control={control}
          label="Nome completo"
          name="name"
        />
        <InputField
          disabled={!isEdit}
          control={control}
          label="Email"
          name="email"
        />
        <InputField
          disabled={!isEdit}
          control={control}
          label="Senha"
          name="password"
          type="password"
        />
        <InputField
          disabled={!isEdit}
          control={control}
          label="Confirmar senha"
          name="confirmPassword"
          type="password"
        />
        <Button
          disabled={!isEdit}
          onClick={handleSubmit(handleFormSubmit)}
          type="secondary"
        >
          Salvar
        </Button>
      </div>
    </S.EditBox>
  )
}
