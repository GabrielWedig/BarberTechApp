import styled from 'styled-components'
import { colors } from '../../../constants'
import { Container } from '../../../components/container/style'

interface ImageProps {
  url: string
  width: string
  height: string
  top?: string
  bottom?: string
  left?: string
  zindex?: number
}

export const AboutContainer = styled(Container)`
  display: flex;
  align-items: center;
  height: 100vh;
  background-color: ${colors.blue.main};
  position: relative;
`

export const ImagesBox = styled.div`
  display: flex;
  width: 50%;
`

// TODO: resolver os warnings amarelos / diminuir o appStore no photoshop
export const Image = styled.div<ImageProps>`
  background: url(${(props) => props.url}) center / 100% no-repeat;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  z-index: ${(props) => props.zindex};
`

export const ContentBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    color: ${colors.white};
    font-size: 40px;
    font-weight: 700;
  }

  p {
    color: ${colors.white};
  }
`

export const BadgeBox = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 30px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  button > img {
    width: 220px;
  }
`
