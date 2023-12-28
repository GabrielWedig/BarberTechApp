import styled from 'styled-components'
import { colors } from '../../../constants'
import { Container } from '../../../components/container/style'

export const ServicesContainer = styled(Container)`
  height: 100vh;
  background-color: ${colors.white};

  h2 {
    color: ${colors.blue.main};
    font-size: 40px;
    font-weight: 700;
  }

  p {
    color: ${colors.black};
  }
`
