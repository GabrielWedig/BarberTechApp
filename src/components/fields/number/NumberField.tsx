import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { FieldError } from '..'
import { NumberFormatValues, NumericFormat } from 'react-number-format'

interface NumberFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  disabled?: boolean
  isCurency?: boolean
  onChange?: (value: string | number) => void
}

export function NumberField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
  isCurency = false,
  onChange
}: NumberFieldProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  const changeEventHandler = (event: NumberFormatValues) => {
    try {
      onChange?.call(null, event.value)
    } finally {
      field.onChange(event.value)
    }
  }

  return (
    <BaseField label={label} disabled={disabled}>
      <NumericFormat
        value={field.value}
        placeholder={placeholder ?? label}
        onValueChange={changeEventHandler}
        disabled={disabled}
        className={fieldState.error ? 'error' : ''}
        type="text"
        thousandSeparator="."
        decimalSeparator=","
        prefix={isCurency ? 'R$ ' : ''}
        suffix={isCurency ? ',00' : ''}
      />
      <FieldError message={fieldState.error?.message} />
    </BaseField>
  )
}
