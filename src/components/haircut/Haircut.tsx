import { HaircutData } from '../../hooks/api/haircuts/Haircuts'
import { getImageSource } from '../../utils/getImageSource'
import contentJson from '../../content.json'
import * as S from './style'
import { useState } from 'react'
import { Stars } from '../stars/Stars'

interface HaircutProps {
  haircut: HaircutData
}

export const Haircut = ({ haircut }: HaircutProps) => {
  const [showInfos, setShowInfos] = useState(false)

  const content = contentJson.home.services

  const formatPrice = (price: number) => {
    return `R$ ${price},00`
  }

  return (
    <S.Haircut
      onMouseEnter={() => setShowInfos(true)}
      onMouseLeave={() => setShowInfos(false)}
    >
      <S.HaircutMask showInfos={showInfos}>
        <Stars rating={haircut.qntStars} />
        <p>{haircut.description}</p>
      </S.HaircutMask>
      <S.Image url={getImageSource(haircut.imageSource)} />
      <div className="footer">
        <div className="row">
          <span>{haircut.name}</span>
          <span className="price">{formatPrice(haircut.price)}</span>
        </div>
        <button>{content.button}</button>
      </div>
    </S.Haircut>
  )
}
