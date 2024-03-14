import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { FieldError } from '..'
import { ChangeEvent } from 'react'

interface TextareaFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: string) => void
}

export function TextareaField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
  onChange
}: TextareaFieldProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  const changeEventHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      onChange?.call(null, event.target.value)
    } finally {
      field.onChange(event.target.value)
    }
  }

  return (
    <BaseField label={label} disabled={disabled}>
      <textarea
        {...field}
        placeholder={placeholder ?? label}
        disabled={disabled}
        className={fieldState.error ? 'error' : ''}
        onChange={changeEventHandler}
      />
      <FieldError message={fieldState.error?.message} />
    </BaseField>
  )
}
