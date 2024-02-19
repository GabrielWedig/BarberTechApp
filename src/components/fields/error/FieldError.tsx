import ErrorIcon from '@mui/icons-material/Error'
import * as S from './style'
import { Visible } from '../..'

interface FieldErrorProps {
  message?: string
}

export const FieldError = ({ message }: FieldErrorProps) => {
  return (
    <Visible when={!!message}>
      <S.FieldErrorBox>
        <ErrorIcon fontSize="inherit" color="error" />
        <span className="message">{message}</span>
      </S.FieldErrorBox>
    </Visible>
  )
}
