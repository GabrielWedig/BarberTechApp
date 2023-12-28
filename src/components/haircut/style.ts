import { colors } from './../../constants/colors'
import styled from 'styled-components'

interface ImageProps {
  url: string
}

export const Haircut = styled.div`
  width: 350px;
  height: 400px;
  background-color: white;
  filter: drop-shadow(4px 5px 8px rgba(0, 0, 0, 0.35));
  border-radius: 10px;

  .footer {
    padding: 0 20px;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    font-weight: 700;
  }

  .price {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: ${colors.black.main};
    color: ${colors.white};
    font-weight: 400;
  }
`

export const Image = styled.div<ImageProps>`
  border-radius: 10px 10px 0 0;
  background: url(${(props) => props.url}) center / 150% no-repeat;
  width: 100%;
  height: 85%;
`
