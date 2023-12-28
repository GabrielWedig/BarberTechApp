import content from '../../../content.json'
import * as S from './style'

export const Services = () => {
  const { title, text } = content.home.services

  return (
    <S.ServicesContainer>
      <h3>{title}</h3>
      <p>{text}</p>
    </S.ServicesContainer>
  )
}
