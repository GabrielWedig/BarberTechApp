import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { FieldError } from '..'
import { ChangeEvent } from 'react'
import * as S from './style'
import { AddAPhoto, FileUpload } from '@mui/icons-material'

type FileFieldType = 'primary' | 'secondary'

interface TextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  disabled?: boolean
  onChange?: (value: File) => void
  type?: FileFieldType
}

export function FileField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  disabled = false,
  type = 'primary',
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
      {type === 'primary' && (
        <label
          htmlFor="fileInput"
          className={fieldState.error ? 'primary error' : 'primary'}
        >
          <span className="file-name">{fileName}</span>
          <FileUpload />
        </label>
      )}
      {type === 'secondary' && (
        <label
          htmlFor="fileInput"
          className={fieldState.error ? 'secondary error' : 'secondary'}
        >
          <AddAPhoto fontSize="large" />
        </label>
      )}
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
