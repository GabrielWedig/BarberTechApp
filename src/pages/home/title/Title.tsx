import { Button } from '../../../components'
import content from '../../../content.json'
import * as S from './style'

export const Title = () => {
  const { title, schedules, btn } = content.home.title

  return (
    <>
      <S.AboutImg />
      <S.TitleBox>
        <h1>{title}</h1>
        <p>{schedules}</p>
        <Button onClick={() => console.log()}>{btn}</Button>
      </S.TitleBox>
    </>
  )
}
