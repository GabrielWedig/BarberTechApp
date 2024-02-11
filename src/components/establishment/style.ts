import { colors } from './../../constants/colors'
import styled from 'styled-components'

interface ImageProps {
  url: string
}

export const Establishment = styled.div`
  width: 350px;
  height: 500px;
  border-radius: 10px;
  position: relative;
`

export const Image = styled.div<ImageProps>`
  background: url(${(props) => props.url}) center / cover no-repeat;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`

export const Infos = styled.div`
  position: absolute;
  bottom: 5%;
  left: 25%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${colors.white};
  background-color: ${colors.black.main};
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`
