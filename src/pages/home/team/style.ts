import styled from 'styled-components'
import { colors } from '../../../constants'
import { Container } from '../../../components/container/style'

export const TeamContainer = styled(Container)`
  height: calc(100vh - 98px);
  background-color: ${colors.blue.main};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  h2 {
    transform: rotate(-90deg);
    color: #646464;
    font-size: 50px;
    position: absolute;
    left: 0;
  }
`
