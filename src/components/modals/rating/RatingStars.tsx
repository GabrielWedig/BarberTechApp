import { Rating } from '@mui/material'
import { Button } from '../../button/Button'
import * as S from './style'
import { RatingModalTypes, RatingStarsData, RatingStarsTypes } from './RatingModal'

interface RatingStarsProps {
  setType: (type: RatingModalTypes) => void
  setData: (data: RatingStarsData) => void
  next: RatingModalTypes
  type: RatingStarsTypes
  data: RatingStarsData
  title: string,
  text: string
}

export const RatingStars = ({title, text, data, type, setType, setData, next }: RatingStarsProps) => {
  return (
    <S.RatingStars>
      <h3>{title}</h3>
      <p>{text}</p>
      <Rating
        value={data[type]}
        onChange={(_, newValue) => {
          setData({...data, [type]: newValue})
        }}
      />
      <Button type="primary" onClick={() => setType(next)}>
        Próximo
      </Button>
    </S.RatingStars>
  )
}
