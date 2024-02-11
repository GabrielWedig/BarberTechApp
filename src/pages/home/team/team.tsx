import * as S from './style'
import contentJson from '../../../content.json'
import { usingTryCatch } from '../../../hooks/api/usingTryCatch'
import { useEffect } from 'react'
import { useArrayState } from '../../../hooks/useArrayState'
import { BarberData } from '../../../hooks/api/barbers/Barbers'
import { useBarbers } from '../../../hooks/api/barbers/useBarbers'
import { Barber } from '../../../components/barber/Barber'

export const Team = () => {
  const content = contentJson.home.team
  const { getAllBarbers } = useBarbers()

  const { state: barbers, set: setBarbers } = useArrayState<BarberData>()

  useEffect(() => {
    fetchBarbers()
  }, [])

  const fetchBarbers = async () => {
    const { data, error } = await usingTryCatch(getAllBarbers())

    if (error || !data) {
      return
      // chama modal
    }

    setBarbers(data)
  }

  return (
    <S.TeamContainer>
      <h2>{content.title}</h2>
      {barbers.map((barber) => (
        <Barber barber={barber} />
      ))}
    </S.TeamContainer>
  )
}
