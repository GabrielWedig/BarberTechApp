import * as S from './style'

interface StarsProps {
  rating: number
}

export const Stars = ({ rating }: StarsProps) => {
  const qntStars = [1, 2, 3, 4, 5]

  const getFill = (star: number) => {
    if (star <= rating) return 0
    const rest = star - rating
    if (rest === 0) return 100
    return rest * 100
  }

  return (
    <S.Stars>
      <span>{rating > 0 ? rating : ''}</span>
      {qntStars.map((star) => (
        <S.StyledStarIcon fillPercentage={getFill(star)} />
      ))}
    </S.Stars>
  )
}
