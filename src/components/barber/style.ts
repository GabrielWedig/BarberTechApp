import styled from 'styled-components'

interface ImageProps {
  $url: string
}

interface BarberMaskProps {
  $showInfos: string
}

export const Barber = styled.div`
  width: 400px;
  height: auto;
  position: relative;

  .social-box {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }

  .barber-header {
    display: flex;
    justify-content: space-between;
  }

  p,
  span {
    color: var(--white);
  }

  span {
    font-size: 22px;
    font-weight: 500;
  }

  button {
    transition: color 0.5s ease;
    background-color: transparent;
    border: none;
    color: var(--white);
    width: auto;
    margin: 0 5px;
  }

  button:hover {
    color: var(--orange);
  }
`

export const BarberMask = styled.div<BarberMaskProps>`
  width: 100%;
  position: absolute;
  z-index: 1;
  padding: 20px;
  width: 100%;
  height: 500px;
  border-radius: 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: opacity 0.5s ease;
  opacity: ${(props) => props.$showInfos === 'true' ? 1 : 0};
`

export const Image = styled.div<ImageProps>`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 10px;
  background: url(${(props) => props.$url}) center / cover no-repeat;
`