import { Button } from '../../../components'
import contentJson from '../../../content.json'
import * as S from './style'

export const Title = () => {
  const content = contentJson.home.title

  return (
    <>
      <S.TitleImg id='home'/>
      <S.TitleBox>
        <h1>{content.title}</h1>
        <p>{content.schedules}</p>
        <Button onClick={() => console.log('abre modal')}>
          {content.button}
        </Button>
      </S.TitleBox>
    </>
  )
}
