import * as S from './style'
import contentJson from '../../../content.json'
import { useEffect } from 'react'
import { Haircut } from '../../../components'
import {
  useHaircuts,
  HaircutData,
  useArrayState,
  usingTryCatch
} from '../../../hooks'

export const Services = () => {
  const content = contentJson.home.services

  const { getAllHaircuts } = useHaircuts()
  const { state: haircuts, set: setHaircuts } = useArrayState<HaircutData>()

  useEffect(() => {
    fetchHaircuts()
  }, [])

  const fetchHaircuts = async () => {
    const { data, error } = await usingTryCatch(getAllHaircuts())

    if (error || !data) {
      return
      // chama modal
    }

    setHaircuts(data)
  }

  return (
    <S.ServicesContainer id='services'>
      <h2>{content.title}</h2>
      <p>{content.text}</p>
      <div className="haircuts-box">
        {haircuts.map((h) => (
          <Haircut
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
