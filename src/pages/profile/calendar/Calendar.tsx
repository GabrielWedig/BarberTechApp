import { CalendarData, useBarbers, useTryCatch } from '../../../hooks'
import * as S from './style'
import { useEffect, useState } from 'react'
import { Day } from '../../../components'

interface CalendarProps {
  barberId: string
}

export const Calendar = ({ barberId }: CalendarProps) => {
  const [calendar, setCalendar] = useState<CalendarData>({})

  const { getCalendar } = useBarbers()
  const { fetchAndSet } = useTryCatch()

  useEffect(() => {
    fetchCalendar()
  }, [])

  const fetchCalendar = async () =>
    await fetchAndSet(getCalendar(barberId), setCalendar)

  return (
    <S.CalendarBox>
      <h2>Calendário</h2>
      <div className="calendar">
        {Object.keys(calendar).map((day) => (
          <Day
            fetchCalendar={fetchCalendar}
            name={day}
            schedules={calendar[day]}
          />
        ))}
      </div>
    </S.CalendarBox>
  )
}
