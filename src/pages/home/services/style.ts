import styled from 'styled-components'
import { Container } from '../../../components'

export const ServicesContainer = styled(Container)`
  height: calc(100vh - 98px);
  background-color: var(--white);
  padding-top: 100px;
  padding-bottom: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  h2 {
    color: var(--blue);
    font-size: 40px;
    font-weight: 700;
  }

  p {
    width: 70%;
    color: var(--black);
  }

  .haircuts-box {
    display: flex;
    gap: 30px;
    max-width: 100%;
  }
`
