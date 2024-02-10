import { Stars } from '..'
import { HaircutData } from '../../hooks/api/haircuts/Haircuts'
import { getImageSource } from '../../utils/getImageSource'
import * as S from './style'

interface HaircutProps {
  haircut: HaircutData
}

export const Haircut = ({ haircut }: HaircutProps) => {
  const formatPrice = (price: number) => {
    return `R$ ${price},00`
  }

  return (
    <S.Haircut>
      <S.Image url={getImageSource(haircut.imageSource)} />
      <div className="footer">
        <div className="row">
          <span>{haircut.name}</span>
          <span className="price">{formatPrice(haircut.price)}</span>
        </div>
        <div className="row">
          <Stars rating={haircut.qntStars} />
          <button>Agendar horário</button>
        </div>
      </div>
    </S.Haircut>
  )
}
