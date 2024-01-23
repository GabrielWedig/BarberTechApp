import styled from 'styled-components'
import { colors } from '../../../constants'
import { Container } from '../../../components/container/style'

export const ServicesContainer = styled(Container)`
  height: calc(100vh - 98px);
  background-color: ${colors.white};
  padding-top: 110px;
  padding-bottom: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: ${colors.blue.main};
    font-size: 40px;
    font-weight: 700;
  }

  p {
    width: 70%;
    color: ${colors.black};
    margin-top: 15px;
    margin-bottom: 50px;
  }

  .haircuts-box {
    display: flex;
    gap: 30px;
  }
`
