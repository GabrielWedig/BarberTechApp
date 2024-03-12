import { Visible } from '../..'
import * as S from './style'

interface BaseFieldProps {
  children: React.ReactNode
  label?: string
  disabled?: boolean
}

export function BaseField({
  label,
  children,
  disabled = false
}: BaseFieldProps) {
  return (
    <S.FieldBox disabled={disabled}>
      <Visible when={!!label}>
        <S.Label>{label}</S.Label>
      </Visible>
      {children}
    </S.FieldBox>
  )
}
