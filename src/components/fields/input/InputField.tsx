import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { FieldError } from '..'
import { ChangeEvent } from 'react'

type InputTypes = 'text' | 'number' | 'password'

interface TextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: string | number) => void
  type?: InputTypes
}

export function InputField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
  onChange,
  type = 'text'
}: TextFieldProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      onChange?.call(null, event.target.value)
    } finally {
      field.onChange(event.target.value)
    }
  }

  return (
    <BaseField label={label} disabled={disabled}>
      <input
        {...field}
        placeholder={placeholder ?? label}
        disabled={disabled}
        className={fieldState.error ? 'error' : ''}
        onChange={changeEventHandler}
        type={type}
      />
      <FieldError message={fieldState.error?.message} />
    </BaseField>
  )
}
