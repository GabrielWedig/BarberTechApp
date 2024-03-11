import * as S from './style'
import contentJson from '../../../content.json'
import { useEffect, useState } from 'react'
import { Haircut, Pagination } from '../../../components'
import {
  useHaircuts,
  HaircutsData,
  usingTryCatch,
  useSnackbarContext,
  Paged
} from '../../../hooks'

export const Services = () => {
  const content = contentJson.home.services
  const pageSize = 4

  const { getAllHaircuts } = useHaircuts()
  const { showErrorSnackbar } = useSnackbarContext()

  const [haircuts, setHaircuts] = useState<Paged<HaircutsData[]>>()

  useEffect(() => {
    fetchHaircuts(1)
  }, [])

  const fetchHaircuts = async (page: number) => {
    const { data, error } = await usingTryCatch(getAllHaircuts(page, pageSize))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setHaircuts(data)
  }

  return (
    <S.ServicesContainer id="services">
      <h2>{content.title}</h2>
      <p>{content.text}</p>
      <div className="haircuts-box">
        {haircuts?.items.map((h) => (
          <Haircut
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
