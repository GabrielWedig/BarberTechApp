import * as S from './style'
import contentJson from '../../../content.json'
import { useEffect } from 'react'
import { Barber } from '../../../components'
import {
  useBarbers,
  BarberData,
  useArrayState,
  usingTryCatch
} from '../../../hooks'

export const Team = () => {
  const content = contentJson.home.team

  const { state: barbers, set: setBarbers } = useArrayState<BarberData>()

  const { getAllBarbers } = useBarbers()

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
      {barbers.map((b) => (
        <Barber
          about={b.about}
          imageSource={b.imageSource}
          name={b.name}
          rating={b.qntStars}
          key={b.id}
        />
      ))}
    </S.TeamContainer>
  )
}
