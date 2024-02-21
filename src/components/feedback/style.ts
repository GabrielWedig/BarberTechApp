import styled from 'styled-components'

export const FeedbackBox = styled.div`
  padding: 40px 0 0 80px;
  height: auto;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .footer {
    display: flex;
    justify-content: space-between;
  }

  svg:first-child {
    color: var(--orange);
    font-size: 80px;
    position: absolute;
    top: 0;
    left: 0;
  }

  span, h3 {
    color: var(--white)
  }
`
