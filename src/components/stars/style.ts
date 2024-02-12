import StarIcon from '@mui/icons-material/Star'
import styled from 'styled-components'

interface StarProps {
  $fillPercentage: number
}

export const Stars = styled.div`
  display: flex;
  gap: 2px;

  span {
    margin-right: 5px;
  }
`

export const StyledStarIcon = styled(StarIcon)<StarProps>`
  color: gold;
  clip-path: ${({ $fillPercentage }) => `inset(0 ${$fillPercentage}% 0 0)`};
`
