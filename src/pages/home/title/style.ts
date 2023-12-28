import styled from 'styled-components'
import { colors, shadows } from '../../../constants'
import contentJson from '../../../content.json'
import { getImageSource } from '../../../utils/getImageSource'

export const AboutImg = styled.div`
  width: 100%;
  padding-top: 98px;
  height: calc(100vh - 98px);
  background: linear-gradient(
      ${colors.blue.eighty} 20.37%,
      ${colors.blue.fifty} 56.89%,
      ${colors.blue.main} 89.13%,
      ${colors.blue.main} 111.22%
    ),
    url(${getImageSource(contentJson.home.title.image)}) center / 100% no-repeat;
`

export const TitleBox = styled.section`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h1 {
    width: 850px;
    color: ${colors.white};
    text-shadow: ${shadows.main} ${colors.black.fifty};
    text-align: center;
    font-size: 44px;
    font-weight: 700;
  }

  p {
    color: ${colors.white};
    text-shadow: ${shadows.main} ${colors.black.eighty};
    font-size: 26px;
    font-weight: 300;
  }
`
