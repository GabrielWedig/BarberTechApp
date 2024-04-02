import { FieldValues, useForm } from 'react-hook-form'
import { TextareaField } from '../../fields'
import { RatingModalTypes, RatingStarsData } from './RatingModal'
import { Button } from '../../button/Button'
import * as S from './style'
import { useFeedbacks, useTryCatch } from '../../../hooks'


interface RatingCommentProps {
  setType: (type: RatingModalTypes) => void
  setData: (value: any) => void
  data?: RatingStarsData | null
  eventScheduleId: string
  onClose: () => void
}

export const RatingComment = ({onClose, data, setType, setData, eventScheduleId }: RatingCommentProps) => {
  const { control, handleSubmit } = useForm()
  const {fetchWithMessage } = useTryCatch()
  const {createFeedback} = useFeedbacks()

  const handleSubmitForm = async (values:FieldValues) => {
    const request = {
      comment: values.comment, 
      ratingBarber: data?.barber ?? 0,
      ratingHaircut: data?.haircut ?? 0,
      ratingEstablishment: data?.establishment ?? 0,
      eventScheduleId: eventScheduleId
    }

    await fetchWithMessage(
      createFeedback(request),
      'Avaliação feita com sucesso!'
    )

    onClose()
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
      <Button type="primary" onClick={handleSubmit(handleSubmitForm)} >
        Concluir
      </Button>
    </S.RatingStars>
  )
}
