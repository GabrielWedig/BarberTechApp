import styled from 'styled-components'
import contentJson from '../../../content.json'

export const TitleImg = styled.div`
  width: 100%;
  margin-top: 98px;
  height: calc(100vh - 98px);
  background: linear-gradient(to top, var(--blue), transparent),
    linear-gradient(to bottom, var(--blue), transparent),
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
  gap: 25px;

  h1 {
    width: 850px;
    color: var(--white);
    text-shadow: var(--shadow80);
    text-align: center;
    font-size: 44px;
    font-weight: 600;
  }

  p {
    color: var(--white);
    text-shadow: var(--shadow50);
    font-size: 26px;
    font-weight: 300;
  }
`
