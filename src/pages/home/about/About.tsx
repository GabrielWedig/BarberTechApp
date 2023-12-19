import * as S from './style'
import content from '../../../content.json'
import image1 from '../../../img/about1.jpeg'
import image2 from '../../../img/about2.jpeg'
import image3 from '../../../img/about3.jpeg'
import googlePlay from '../../../img/google-play-badge.png'
import appStore from '../../../img/app-store-badge.svg'

export const About = () => {
  const { title, text1, text2 } = content.home.about

  return (
    <S.AboutContainer>
      <S.ImagesBox>
        <S.Image
          url={image1}
          width="320px"
          height="370px"
          top="20%"
          left="15%"
          zindex={1}
        />
        <S.Image
          url={image2}
          width="250px"
          height="300px"
          bottom="10%"
          left="30%"
          zindex={2}
        />
        <S.Image url={image3} width="400px" height="300px" bottom="11%" />
      </S.ImagesBox>
      <S.ContentBox>
        <h2>{title}</h2>
        <p>{text1}</p>
        <p>{text2}</p>
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
