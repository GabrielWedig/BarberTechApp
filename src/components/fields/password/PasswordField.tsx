import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { FieldError } from '..'

interface TextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  placeholder?: string
  disabled?: boolean
}

export function PasswordField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled
}: TextFieldProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  return (
    <BaseField label={label} disabled={disabled}>
      <input
        {...field}
        placeholder={placeholder ?? label}
        disabled={disabled}
        type="password"
        className={fieldState.error ? 'error' : ''}
      />
      <FieldError message={fieldState.error?.message} />
    </BaseField>
  )
}
