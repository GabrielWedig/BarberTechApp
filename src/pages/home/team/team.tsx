import * as S from './style'
import contentJson from '../../../content.json'
import { useEffect, useState } from 'react'
import { Barber, Pagination } from '../../../components'
import { useBarbers, BarbersData, useTryCatch, Paged } from '../../../hooks'

export const Team = () => {
  const content = contentJson.home.team
  const pageSize = 3

  const [barbers, setBarbers] = useState<Paged<BarbersData[]>>()

  const { getAllBarbers } = useBarbers()
  const { fetchAndSet } = useTryCatch()

  useEffect(() => {
    fetchBarbers(1)
  }, [])

  const fetchBarbers = async (page: number) =>
    await fetchAndSet(getAllBarbers(page, pageSize), setBarbers)

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
