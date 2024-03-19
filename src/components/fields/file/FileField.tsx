import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { FieldError } from '..'
import { ChangeEvent } from 'react'
import * as S from './style'
import { FileUpload } from '@mui/icons-material'

interface TextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  disabled?: boolean
  onChange?: (value: File) => void
}

export function FileField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  disabled = false,
  onChange
}: TextFieldProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0)

    if (!file) return

    try {
      onChange?.call(null, file)
    } finally {
      field.onChange(event)
    }
  }

  const fileName = !field.value ? 'Fazer upload' : field.value.substring(12)

  return (
    <S.FileInput disabled={disabled}>
      <label className="label">{label}</label>
      <label
        htmlFor="fileInput"
        className={fieldState.error ? 'button error' : 'button'}
      >
        <span className="file-name">{fileName}</span>
        <FileUpload />
      </label>
      <input
        {...field}
        onChange={changeEventHandler}
        type="file"
        id="fileInput"
        disabled={disabled}
        accept="image/*"
      />
      <FieldError message={fieldState.error?.message} />
    </S.FileInput>
  )
}
