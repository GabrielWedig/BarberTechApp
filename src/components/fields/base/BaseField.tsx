import * as S from './style'

interface BaseFieldProps {
  label: string
  disabled?: boolean
  children: React.ReactNode
}

export function BaseField({
  label,
  children,
  disabled = false
}: BaseFieldProps) {
  return (
    <S.FieldBox disabled={disabled}>
      <S.Label>{label}</S.Label>
      {children}
    </S.FieldBox>
  )
}
