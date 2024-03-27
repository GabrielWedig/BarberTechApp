import { HaircutItem } from '../../../components'
import { UserData } from '../../../hooks'
import * as S from './style'

interface HistoryProps {
  user?: UserData | null
}

export const History = ({ user }: HistoryProps) => {
  return (
    <S.HistoryBox>
      <h1>Histórico de cortes</h1>
      <div className='categories'>
        <p>CORTE</p>
        <p>DATA</p>
        <p>AVALIAÇÃO</p>
      </div>
      <div>
        {user?.eventSchedules.map((es) => (
          <HaircutItem
            barberName={es.barberName}
            name={es.haircut.name}
            date={es.dateTime}
            imageSource={es.haircut.imageSource}
          />
        ))}
      </div>
    </S.HistoryBox>
  )
}
