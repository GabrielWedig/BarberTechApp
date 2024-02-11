import * as S from './style'
import contentJson from '../../../content.json'
import { useHaircuts } from '../../../hooks/api/haircuts/useHaircuts'
import { usingTryCatch } from '../../../hooks/api/usingTryCatch' // rever imports / criar index lá
import { useEffect } from 'react'
import { useArrayState } from '../../../hooks/useArrayState'
import { HaircutData } from '../../../hooks/api/haircuts/Haircuts'
import { Haircut } from '../../../components'

export const Services = () => {
  const content = contentJson.home.services
  const { getAllHaircuts } = useHaircuts()
  const { state: haircuts, set: setHaircuts } =
    useArrayState<HaircutData>()

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
    <S.ServicesContainer>
      <h2>{content.title}</h2>
      <p>{content.text}</p>
      <div className="haircuts-box">
        {haircuts.map((haircut) => (
          <Haircut haircut={haircut} />
        ))}
      </div>
    </S.ServicesContainer>
  )
}
