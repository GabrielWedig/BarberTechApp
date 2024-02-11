import styled from 'styled-components'
import { colors } from '../../../constants'
import { Container } from '../../../components/container/style'

export const TeamContainer = styled(Container)`
  height: calc(100vh - 98px);
  background-color: ${colors.white};
  padding-top: 110px;
  display: flex;
  justify-content: center;

  h2 {
    color: ${colors.blue.main};
    font-size: 40px;
    font-weight: 700;
  }
`
