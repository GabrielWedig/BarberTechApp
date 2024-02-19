import * as S from './style'
import contentJson from '../../../content.json'
import { useEffect, useState } from 'react'
import { Barber } from '../../../components'
import {
  useBarbers,
  BarberData,
  usingTryCatch,
  useSnackbarContext
} from '../../../hooks'

export const Team = () => {
  const content = contentJson.home.team

  const [barbers, setBarbers] = useState<BarberData[]>([])

  const { showErrorSnackbar } = useSnackbarContext()

  const { getAllBarbers } = useBarbers()

  useEffect(() => {
    fetchBarbers()
  }, [])

  const fetchBarbers = async () => {
    const { data, error } = await usingTryCatch(getAllBarbers())

    if (error || !data) {
      showErrorSnackbar(error)
      return
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
