import { Button } from '../../../components'
import contentJson from '../../../content.json'
import { scrollToSection } from '../../../utils'
import * as S from './style'

export const Title = () => {
  const content = contentJson.home.title

  return (
    <S.TitleContainer id="home">
      <h1>{content.title}</h1>
      <p>{content.schedules}</p>
      <Button onClick={() => scrollToSection('services')}>
        {content.button}
      </Button>
    </S.TitleContainer>
  )
}
