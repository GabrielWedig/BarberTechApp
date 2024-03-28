import * as S from './style'
import contentJson from '../../../content.json'
import { useEffect, useState } from 'react'
import { Establishment, Pagination } from '../../../components'
import {
  useEstablishments,
  EstablishmentsData,
  useTryCatch,
  Paged
} from '../../../hooks'

export const Localization = () => {
  const content = contentJson.home.localization
  const pageSize = 3

  const { getAllEstablishments } = useEstablishments()
  const { fetchAndSet } = useTryCatch()

  const [establishments, setEstablishments] =
    useState<Paged<EstablishmentsData[]>>()

  useEffect(() => {
    fetchEstablishments(1)
  }, [])

  const fetchEstablishments = async (page: number) =>
    await fetchAndSet(getAllEstablishments(page, pageSize), setEstablishments)

  return (
    <S.EstablishmentsContainer>
      <h2>{content.title}</h2>
      <div className="establishments-box">
        {establishments?.items.map((e) => (
          <Establishment
            key={e.id}
            address={e.address}
            imageSource={e.imageSource}
            businessTime={e.businessTime}
            rating={e.rating}
          />
        ))}
      </div>
      <Pagination
        totalCount={establishments?.totalCount ?? 0}
        pageSize={pageSize}
        handleChange={fetchEstablishments}
      />
    </S.EstablishmentsContainer>
  )
}
