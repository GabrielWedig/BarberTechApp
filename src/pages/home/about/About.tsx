import * as S from './style'
import contentJson from '../../../content.json'
import googlePlay from '../../../img/google-play-badge.png'
import appStore from '../../../img/app-store-badge.svg'
import { getImageSource } from '../../../utils/getImageSource'

export const About = () => {
  const content = contentJson.home.about

  return (
    <S.AboutContainer>
      <S.ImagesBox>
        <S.Image
          url={getImageSource(content.images[0])}
          width="320px"
          height="370px"
          top="20%"
          left="15%"
          zindex={1}
        />
        <S.Image
          url={getImageSource(content.images[1])}
          width="250px"
          height="300px"
          bottom="10%"
          left="30%"
          zindex={2}
        />
        <S.Image
          url={getImageSource(content.images[2])}
          width="400px"
          height="300px"
          bottom="11%"
        />
      </S.ImagesBox>
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
