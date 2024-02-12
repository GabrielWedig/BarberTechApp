import * as S from './style'
import contentJson from '../../content.json'
import { useState } from 'react'
import { Stars } from '..'
import { formatPrice } from '../../utils'

interface HaircutProps {
  rating: number
  about?: string
  imageSource: string
  name: string
  price: number
}

export const Haircut = ({
  rating,
  about,
  imageSource,
  name,
  price
}: HaircutProps) => {
  const [showInfos, setShowInfos] = useState(false)

  const content = contentJson.home.services

  return (
    <S.Haircut
      onMouseEnter={() => setShowInfos(true)}
      onMouseLeave={() => setShowInfos(false)}
    >
      <S.HaircutMask showInfos={showInfos}>
        <Stars rating={rating} />
        <p className='about'>{about ?? ''}</p>
      </S.HaircutMask>
      <S.Image url={imageSource} />
      <div className="footer">
        <div className="row">
          <span>{name}</span>
          <span className="price">{formatPrice(price)}</span>
        </div>
        <span className='schedule'>{content.schedule}</span>
      </div>
    </S.Haircut>
  )
}
