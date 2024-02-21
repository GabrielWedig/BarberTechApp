import styled from 'styled-components'
import { Container } from '../../components'

export const FeedbackContainer = styled(Container)`
  margin-top: 98px;
  height: calc(100vh - 98px);
  background-color: var(--blue);
  padding-top: 50px;
  display: flex;
  justify-content: space-between;

  .tab {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .tab > span:first-child {
    background-color: var(--orange);
    height: 2px;
    width: 20px;
  }

  .tab > span:last-child {
    color: var(--orange);
    font-size: 18px;
    letter-spacing: 2px;
  }

  .column {
    width: 47.5%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  h2 {
    color: var(--white);
    font-size: 30px;
    font-weight: 600;
  }

  p {
    color: var(--white);
  }

  img {
    margin-top: 40px;
    width: 80%;
    border-radius: 10px;
  }
`
