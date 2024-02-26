import * as S from './style'
import contentJson from '../../../content.json'
import googlePlay from '../../../img/google-play.png'
import appStore from '../../../img/app-store.svg'
import aboutImage from '../../../img/about.png'

export const About = () => {
  const content = contentJson.home.about

  return (
    <S.AboutContainer id="about">
      <img src={aboutImage} alt="image" />
      <S.ContentBox>
        <h2>{content.title}</h2>
        <p>{content.text1}</p>
        <p>{content.text2}</p>
        <S.BadgeBox>
          <a href="https://play.google.com/">
            <img src={googlePlay} alt="google-play" />
          </a>
          <a href="https://www.apple.com/">
            <img src={appStore} alt="app-store" className="app-store-badge" />
          </a>
        </S.BadgeBox>
      </S.ContentBox>
    </S.AboutContainer>
  )
}
