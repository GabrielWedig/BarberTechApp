import styled from 'styled-components'

interface ImageProps {
  $url: string
}

interface HaircutMaskProps {
  $showInfos: string
}

export const Haircut = styled.button`
  width: 325px;
  height: 450px;
  background-color: var(--white);
  filter: var(--dropShadow);
  border-radius: 10px;
  border: none;
  padding: 0;
  font-size: 16px;
  transition: background-color 0.5s ease;

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

  .schedule {
    color: var(--black);
    background-color: transparent;
    text-decoration: underline;
    font-weight: 400;
    border: none;
    font-size: 16px;
  }

  span {
    font-weight: 600;
  }

  .price {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: var(--black);
    color: var(--white);
    font-weight: 400;
  }

  .about {
    width: 100%;
    margin: 0;
    color: var(--white);
    text-align: start;
  }

  &:hover {
    background-color: var(--gray);
  }
`

export const HaircutMask = styled.div<HaircutMaskProps>`
  width: 100%;
  position: absolute;
  z-index: 1;
  padding: 20px;
  width: 100%;
  height: 80%;
  border-radius: 10px 10px 0 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.$showInfos ? 1 : 0)};

  span {
    color: var(--white);
  }
`

export const Image = styled.div<ImageProps>`
  background: url(${(props) => props.$url}) center / cover no-repeat;
  width: 100%;
  height: 80%;
  border-radius: 10px 10px 0 0;
`
