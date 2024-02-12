import * as S from './style'
import contentJson from '../../../content.json'
import { useEffect } from 'react'
import { Establishment } from '../../../components'
import {
  useEstablishments,
  EstablishmentData,
  useArrayState,
  usingTryCatch
} from '../../../hooks'

export const Localization = () => {
  const content = contentJson.home.localization

  const { getAllEstablishments } = useEstablishments()

  const { state: establishments, set: setEstablishments } =
    useArrayState<EstablishmentData>()

  useEffect(() => {
    fetchEstablishments()
  }, [])

  const fetchEstablishments = async () => {
    const { data, error } = await usingTryCatch(getAllEstablishments())

    if (error || !data) {
      return
      // chama modal
    }

    setEstablishments(data)
  }

  return (
    <S.EstablishmentsContainer>
      <h2>{content.title}</h2>
      <div className="establishments-box">
        {establishments.map((e) => (
          <Establishment
            address={e.address}
            businessTime={e.businessTime}
            imageSource={e.imageSource}
            rating={e.qntStars}
            key={e.id}
          />
        ))}
      </div>
    </S.EstablishmentsContainer>
  )
}
