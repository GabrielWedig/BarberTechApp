import * as S from './style'
import contentJson from '../../content.json'
import { useState } from 'react'
import { LoginModal, ScheduleModal, Stars } from '..'
import { formatPrice } from '../../utils'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

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
  const [showInfos, setShowInfos] = useState<boolean>(false)
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const [openScheduleModal, setOpenScheduleModal] = useState<boolean>(false)

  const content = contentJson.home.services

  const isAuthenticated = useIsAuthenticated()

  const handleHaircutClick = () => {
    if (!isAuthenticated()) {
      return setOpenLoginModal(true)
    }
    return setOpenScheduleModal(true)
  }

  return (
    <>
      <S.Haircut
        onMouseEnter={() => setShowInfos(true)}
        onMouseLeave={() => setShowInfos(false)}
        onClick={handleHaircutClick}
      >
        <S.HaircutMask $showInfos={showInfos ? 'true' : 'false'}>
          <Stars rating={rating} />
          <p className="about">{about ?? ''}</p>
        </S.HaircutMask>
        <S.Image $url={imageSource} />
        <div className="footer">
          <div className="row">
            <span>{name}</span>
            <span className="price">{formatPrice(price)}</span>
          </div>
          <span className="schedule">{content.schedule}</span>
        </div>
      </S.Haircut>
      <LoginModal
        onClose={() => setOpenLoginModal(false)}
        open={openLoginModal}
      />
      <ScheduleModal
        onClose={() => setOpenScheduleModal(false)}
        open={openScheduleModal}
      />
    </>
  )
}
