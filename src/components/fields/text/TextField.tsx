import { Control, FieldValues, Path } from 'react-hook-form'
import * as S from './style'

interface TextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  placeholder?: string
}

export function TextField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder
}: TextFieldProps<TFieldValues>) {
  return (
    <S.InputBox>
      <S.Label>{label}</S.Label>
      <S.Input {...control.register(name)} placeholder={placeholder ?? label} />
    </S.InputBox>
  )
}
