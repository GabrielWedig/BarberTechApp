import { EstablishmentData } from '../../hooks/api/establishments/Establishments'
import { getImageSource } from '../../utils/getImageSource'
import { Stars } from '../stars/Stars'
import * as S from './style'

interface EstablishmentProps {
  establishment: EstablishmentData
}

export const Establishment = ({ establishment }: EstablishmentProps) => {
  return (
    <S.Establishment>
      <S.Image url={getImageSource(establishment.imageSource)} />
      <S.Infos>
        <span>{establishment.address}</span>
        <Stars rating={establishment.qntStars} />
        <span>{establishment.businessTime}</span>
      </S.Infos>
    </S.Establishment>
  )
}
