import * as S from './style'
import contentJson from '../../../content.json'
import { usingTryCatch } from '../../../hooks/api/usingTryCatch'
import { useEffect } from 'react'
import { useArrayState } from '../../../hooks/useArrayState'
import { useEstablishments } from '../../../hooks/api/establishments/useEstablishments'
import { EstablishmentData } from '../../../hooks/api/establishments/Establishments'
import { Establishment } from '../../../components'

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
        {establishments.map((establishment) => (
          <Establishment establishment={establishment} />
        ))}
      </div>
    </S.EstablishmentsContainer>
  )
}
