import * as S from './style'
import { Instagram, Facebook } from '@mui/icons-material'
import { useState } from 'react'
import { Stars } from '..'

interface BarberProps {
  name: string
  rating: number
  about: string
  imageSource: string
}

export const Barber = ({ name, rating, about, imageSource }: BarberProps) => {
  const [showInfos, setShowInfos] = useState(false)

  return (
    <S.Barber
      onMouseEnter={() => setShowInfos(true)}
      onMouseLeave={() => setShowInfos(false)}
    >
      <S.BarberMask showInfos={showInfos}>
        <div className="barber-header">
          <span>{name}</span>
          <Stars rating={rating} />
        </div>
        <p>{about}</p>
      </S.BarberMask>
      <S.Image url={imageSource} />
      <div className="social-box">
        <button>
          <Instagram fontSize="large" />
        </button>
        <button>
          <Facebook fontSize="large" />
        </button>
      </div>
    </S.Barber>
  )
}
