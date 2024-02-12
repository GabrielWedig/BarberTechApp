import styled from 'styled-components'
import contentJson from '../../../content.json'

export const AboutImg = styled.div`
  width: 100%;
  padding-top: 98px;
  height: calc(100vh - 98px);
  background: linear-gradient(
      var(--blue80) 20.37%,
      var(--blue50) 56.89%,
      var(--blue) 89.13%,
      var(--blue) 111.22%
    ),
    url(${contentJson.home.title.image}) center / cover no-repeat;
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
    color: var(--white);
    text-shadow: var(--shadow);
    text-align: center;
    font-size: 44px;
    font-weight: 700;
  }

  p {
    color: var(--white);
    text-shadow: var(--shadow);
    font-size: 26px;
    font-weight: 300;
  }
`
