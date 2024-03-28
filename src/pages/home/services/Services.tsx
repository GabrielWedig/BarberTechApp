import * as S from './style'
import contentJson from '../../../content.json'
import { useEffect, useState } from 'react'
import { Haircut, Pagination } from '../../../components'
import { useHaircuts, HaircutsData, useTryCatch, Paged } from '../../../hooks'

export const Services = () => {
  const content = contentJson.home.services
  const pageSize = 4

  const { getAllHaircuts } = useHaircuts()
  const { fetchAndSet } = useTryCatch()

  const [haircuts, setHaircuts] = useState<Paged<HaircutsData[]>>()

  useEffect(() => {
    fetchHaircuts(1)
  }, [])

  const fetchHaircuts = async (page: number) =>
    await fetchAndSet(getAllHaircuts(page, pageSize), setHaircuts)

  return (
    <S.ServicesContainer id="services">
      <h2>{content.title}</h2>
      <p>{content.text}</p>
      <div className="haircuts-box">
        {haircuts?.items.map((h) => (
          <Haircut
            key={h.id}
            id={h.id}
            name={h.name}
            about={h.about}
            price={h.price}
            imageSource={h.imageSource}
            rating={h.rating}
          />
        ))}
      </div>
      <Pagination
        totalCount={haircuts?.totalCount ?? 0}
        pageSize={pageSize}
        handleChange={fetchHaircuts}
      />
    </S.ServicesContainer>
  )
}
