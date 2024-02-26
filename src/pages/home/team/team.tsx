import * as S from './style'
import contentJson from '../../../content.json'
import { useEffect, useState } from 'react'
import { Barber, Pagination } from '../../../components'
import {
  useBarbers,
  BarberData,
  usingTryCatch,
  useSnackbarContext,
  PagedResponse
} from '../../../hooks'

export const Team = () => {
  const content = contentJson.home.team
  const pageSize = 3

  const [barbers, setBarbers] = useState<PagedResponse<BarberData[]>>()

  const { showErrorSnackbar } = useSnackbarContext()

  const { getAllBarbers } = useBarbers()

  useEffect(() => {
    fetchBarbers(1)
  }, [])

  const fetchBarbers = async (page: number) => {
    const { data, error } = await usingTryCatch(getAllBarbers(page, pageSize))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setBarbers(data)
  }

  return (
    <S.TeamContainer>
      <h2>{content.title}</h2>
      <div className="barbers-box">
        {barbers?.items.map((b) => (
          <Barber
            about={b.about}
            imageSource={b.imageSource}
            name={b.name}
            rating={b.rating}
            social={b.social}
            key={b.id}
          />
        ))}
      </div>
      <Pagination
        totalCount={barbers?.totalCount ?? 0}
        pageSize={pageSize}
        handleChange={fetchBarbers}
        paginationColor="white"
      />
    </S.TeamContainer>
  )
}
