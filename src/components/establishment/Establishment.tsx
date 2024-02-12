import { Stars } from '..'
import * as S from './style'

interface EstablishmentProps {
  imageSource: string
  address: string
  rating: number
  businessTime: string
}

export const Establishment = ({
  imageSource,
  address,
  rating,
  businessTime
}: EstablishmentProps) => {
  return (
    <S.Establishment>
      <S.Image url={imageSource} />
      <S.Infos>
        <span>{address}</span>
        <Stars rating={rating} />
        <span>{businessTime}</span>
      </S.Infos>
    </S.Establishment>
  )
}
