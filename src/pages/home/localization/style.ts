import styled from 'styled-components'
import { Container } from '../../../components'

export const EstablishmentsContainer = styled(Container)`
  height: calc(100vh - 98px);
  background-color: var(--white);
  padding-top: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: var(--blue);
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .establishments-box {
    display: flex;
    gap: 30px;
  }
`
