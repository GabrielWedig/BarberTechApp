import * as S from './style'
import { Instagram, Facebook, Twitter } from '@mui/icons-material'
import { useState } from 'react'
import { Stars, Visible } from '..'
import { SocialData } from '../../hooks'

interface BarberProps {
  name: string
  rating: number
  about: string
  imageSource: string
  social: SocialData
}

export const Barber = ({
  name,
  rating,
  about,
  imageSource,
  social
}: BarberProps) => {
  const [showInfos, setShowInfos] = useState<boolean>(false)

  return (
    <S.Barber
      onMouseEnter={() => setShowInfos(true)}
      onMouseLeave={() => setShowInfos(false)}
    >
      <S.BarberMask $showInfos={showInfos ? 'true' : 'false'}>
        <div className="barber-header">
          <span>{name}</span>
          <Stars rating={rating} />
        </div>
        <p>{about}</p>
      </S.BarberMask>
      <S.Image $url={imageSource} />
      <div className="social-box">
        <Visible when={!!social.instagram}>
          <a href={social.instagram}>
            <Instagram fontSize="large" />
          </a>
        </Visible>
        <Visible when={!!social.facebook}>
          <a href={social.facebook}>
            <Facebook fontSize="large" />
          </a>
        </Visible>
        <Visible when={!!social.twitter}>
          <a href={social.twitter}>
            <Twitter fontSize="large" />
          </a>
        </Visible>
      </div>
    </S.Barber>
  )
}
