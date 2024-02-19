import * as S from './style'
import contentJson from '../../../content.json'
import { useEffect, useState } from 'react'
import { Haircut } from '../../../components'
import {
  useHaircuts,
  HaircutData,
  usingTryCatch,
  useSnackbarContext
} from '../../../hooks'

export const Services = () => {
  const content = contentJson.home.services

  const { getAllHaircuts } = useHaircuts()
  const { showErrorSnackbar } = useSnackbarContext()
  
  const [haircuts, setHaircuts] = useState<HaircutData[]>([])

  useEffect(() => {
    fetchHaircuts()
  }, [])

  const fetchHaircuts = async () => {
    const { data, error } = await usingTryCatch(getAllHaircuts())

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
        {haircuts.map((h) => (
          <Haircut
            id={h.id}
            about={h.description}
            imageSource={h.imageSource}
            name={h.name}
            price={h.price}
            rating={h.qntStars}
            key={h.id}
          />
        ))}
      </div>
    </S.ServicesContainer>
  )
}
