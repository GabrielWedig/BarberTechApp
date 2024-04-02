import { useForm } from 'react-hook-form'
import { TextareaField } from '../../fields'
import { RatingModalTypes } from './RatingModal'
import { Button } from '../../button/Button'
import * as S from './style'


interface RatingCommentProps {
  setType: (type: RatingModalTypes) => void
  setData: (value: any) => void
  data?: string | null
}

export const RatingComment = ({ setType, setData }: RatingCommentProps) => {
  const { control, handleSubmit } = useForm()

  const handleSubmitForm = () => {

  }

  return (
    <S.RatingStars>
      <h3>Comentário</h3>
      <TextareaField
        label="Diga-nos como foi sua experiência"
        placeholder="Escreva um comentário (opcional)"
        name="comment"
        control={control}
      />
      <Button type="primary" onClick={handleSubmit(handleSubmitForm)}>
        Concluir
      </Button>
    </S.RatingStars>
  )
}
