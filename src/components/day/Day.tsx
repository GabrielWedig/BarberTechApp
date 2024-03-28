import { Schedule } from '..'
import { TimeData } from '../../hooks'
import * as S from './style'

interface DayProps {
  name: string
  schedules: TimeData
  fetchCalendar: () => void
}

export const Day = ({ name, schedules, fetchCalendar }: DayProps) => {
  return (
    <S.DayBox>
      <span className="day">{name}</span>
      <div className="schedules">
        {Object.keys(schedules).map((time) => (
          <Schedule
            fetchCalendar={fetchCalendar}
            schedule={schedules[time]}
            time={time}
            key={time}
          />
        ))}
      </div>
    </S.DayBox>
  )
}
