import { BarberData } from '../../hooks/api/barbers/Barbers'
import { getImageSource } from '../../utils/getImageSource'
import * as S from './style'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import { useState } from 'react'
import { Stars } from '../stars/Stars'

interface BarberProps {
  barber: BarberData
}

export const Barber = ({ barber }: BarberProps) => {
  const [showInfos, setShowInfos] = useState(false)

  return (
    <S.Barber
      onMouseEnter={() => setShowInfos(true)}
      onMouseLeave={() => setShowInfos(false)}
    >
      <S.BarberMask showInfos={showInfos}>
        <div className="barber-header">
          <span>{barber.name}</span>
          <Stars rating={barber.qntStars} />
        </div>
        <p>{barber.about}</p>
      </S.BarberMask>
      <S.Image url={getImageSource(barber.imageSource)} />
      <div className="social-box">
        <button>
          <InstagramIcon fontSize="large" />
        </button>
        <button>
          <FacebookIcon fontSize="large" />
        </button>
      </div>
    </S.Barber>
  )
}
