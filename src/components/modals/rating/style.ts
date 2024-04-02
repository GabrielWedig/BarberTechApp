import styled from 'styled-components'

export const RatingStars = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  h3 {
    color: var(--white);
    font-size: 28px;
  }

  p {
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
  }

  span {
    font-size: 50px;
  }

  .MuiRating-iconEmpty {
    color: gray;
  }
`

export const RatingComment = styled.div``
