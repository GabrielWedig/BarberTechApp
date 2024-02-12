import * as S from './style'
import contentJson from '../../../content.json'
import googlePlay from '../../../img/google-play-badge.png'
import appStore from '../../../img/app-store-badge.svg'
import aboutImage from '../../../img/about-image.png'

export const About = () => {
  const content = contentJson.home.about

  return (
    <S.AboutContainer>
      <img src={aboutImage} alt="images" />
      <S.ContentBox>
        <h2>{content.title}</h2>
        <p>{content.text1}</p>
        <p>{content.text2}</p>
        <S.BadgeBox>
          <button>
            <img src={googlePlay} alt="google-play" />
          </button>
          <button>
            <img src={appStore} alt="app-store" />
          </button>
        </S.BadgeBox>
      </S.ContentBox>
    </S.AboutContainer>
  )
}
