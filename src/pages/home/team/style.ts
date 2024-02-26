import styled from 'styled-components'
import { Container } from '../../../components'

export const TeamContainer = styled(Container)`
  height: calc(100vh - 98px);
  background-color: var(--blue);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  .barbers-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  h2 {
    transform: rotate(-90deg);
    color: #646464;
    font-size: 50px;
    position: absolute;
    left: 0;
  }
`
