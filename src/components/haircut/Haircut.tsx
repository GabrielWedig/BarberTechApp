import { getImageSource } from '../../utils/getImageSource'
import * as S from './style'

interface HaircutProps {
  name: string
  price: number
  photo: string
  description?: string
}

export const Haircut = ({ name, price, photo, description }: HaircutProps) => {
  const formatPrice = (price: number) => {
    return `R$ ${price},00`
  }
  
  return (
    <S.Haircut>
      <S.Image url={getImageSource(photo)} />
      <div className="footer">
        <span>{name}</span>
        <span className="price">{formatPrice(price)}</span>
      </div>
    </S.Haircut>
  )
}
