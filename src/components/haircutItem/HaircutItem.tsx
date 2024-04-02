import * as S from './style'
import { Button } from '../button/Button'
import { Haircut } from '../haircut/Haircut'
import { useState } from 'react'
import { RatingModal } from '../modals'

interface HaircutItemProps {
  imageSource: string
  name: string
  barberName: string
  date: string
}

export const HaircutItem = ({
  imageSource,
  name,
  barberName,
  date,
}: HaircutItemProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  
  return (
    <S.HaircutItem>
      <div className="column">
      <S.Image url={imageSource}></S.Image>
        <div className="names">
          <span>{name}</span>
          <div>
            <span className='barber'>Barbeiro: </span>
            <span>{barberName}</span>
          </div>
        </div>
      </div>
      <span className="column date">{date}</span>
      <div className='column btn'>
        <Button type="secondary" onClick={() => setOpenModal(true)}>
          Avaliar
        </Button>
      </div>
      <RatingModal open={openModal} onClose={() => setOpenModal(false)}/>
    </S.HaircutItem>
  )
}
