import styled from 'styled-components'

interface ImageProps {
  $url: string
}

export const Establishment = styled.div`
  width: 350px;
  height: 500px;
  border-radius: 10px;
  position: relative;
`

export const Image = styled.div<ImageProps>`
  background: url(${(props) => props.$url}) center / cover no-repeat;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`

export const Infos = styled.div`
  width: 60%;
  position: absolute;
  bottom: 5%;
  left: 20%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--white);
  background-color: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
`
