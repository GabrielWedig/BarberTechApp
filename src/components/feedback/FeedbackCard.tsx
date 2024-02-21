import { FormatQuote } from '@mui/icons-material'
import * as S from './style'
import { Stars } from '..'

interface FeedbackCardProps {
  comment: string
  stars: number
  user: string
  at: string
}

export const FeedbackCard = ({
  comment,
  stars,
  user,
  at
}: FeedbackCardProps) => {
  return (
    <S.FeedbackBox>
      <FormatQuote />
      <h3>{user}</h3>
      <span>{comment}</span>
      <div className="footer">
        <Stars rating={stars} />
        <span>{at}</span>
      </div>
    </S.FeedbackBox>
  )
}
