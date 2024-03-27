import * as S from './style'
import { Button } from '../button/Button'
import { Haircut } from '../haircut/Haircut'

interface HaircutItemProps {
  imageSource: string
  name: string
  barberName: string
  date: string
  // handleClick: () => void
}

export const HaircutItem = ({
  imageSource,
  name,
  barberName,
  date,
  // handleClick
}: HaircutItemProps) => {
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
      <div className='column'>
        <Button type="secondary" onClick={() => {}}>
          Avaliar
        </Button>
      </div>
    </S.HaircutItem>
  )
}
