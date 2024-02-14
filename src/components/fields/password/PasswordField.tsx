import { Control, FieldValues, Path } from 'react-hook-form'
import { BaseField } from '../base/BaseField'

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
  return (
    <BaseField label={label} disabled={disabled}>
      <input
        {...control.register(name)}
        placeholder={placeholder ?? label}
        disabled={disabled}
        type="password"
      />
    </BaseField>
  )
}
