import * as S from './style'

interface StarsProps {
  rating: number
}

export const Stars = ({ rating }: StarsProps) => {
  const qntStars = [1, 2, 3, 4, 5]

  const getFill = (star: number) => {
    if (rating >= star) {
      const convertInteger = Math.floor(rating)
      return (rating - convertInteger) * 10
    }
    return 100
  }

  return (
    <S.Stars>
      <span>{rating}</span>
      {qntStars.map((star) => (
        <S.StyledStarIcon fillPercentage={getFill(star)}/>
      ))}
    </S.Stars>
  )
}
