import { Header, Container, Button } from '../../components'
import * as S from './style'
import content from '../../content.json'

export const Home = () => {
  return (
    <>
      <Header />
      <S.AboutImg />
      <S.TitleBox>
        <h1>{content.home.title}</h1>
        <p>{content.home.schedules}</p>
        <Button onClick={() => console.log()}>{content.home.btn}</Button>
      </S.TitleBox>
      <Container>
        <p>sdfsdf</p>
      </Container>
    </>
  )
}
