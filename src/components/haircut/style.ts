import { colors } from './../../constants/colors'
import styled from 'styled-components'

interface ImageProps {
  url: string
}

export const Haircut = styled.div`
  width: 325px;
  height: 400px;
  background-color: white;
  filter: drop-shadow(4px 5px 8px rgba(0, 0, 0, 0.50));
  border-radius: 0 0 10px 10px;

  .footer {
    padding: 0 20px;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    color: ${colors.black.main};
    background-color: transparent;
    text-decoration: underline;
    font-weight: 400;
    border: none;
    font-size: 14px;
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
  background: url(${(props) => props.url}) center / 150% no-repeat;
  width: 100%;
  height: 80%;
`
