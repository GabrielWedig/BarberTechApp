import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { MenuItem, Select } from '@mui/material'
import { FieldError } from '..'

interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  options: Option[]
  disabled?: boolean
}

export interface Option {
  name: string
  value: any
}

export function SelectField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  options,
  disabled
}: SelectFieldProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  return (
    <BaseField label={label} disabled={disabled}>
      <Select
        {...field}
        disabled={disabled}
        className={fieldState.error ? 'error' : ''}
        defaultValue={options.find((o) => o.value === field.value)}
      >
        {options.map((o) => (
          <MenuItem value={o.value}>{o.name}</MenuItem>
        ))}
      </Select>
      <FieldError message={fieldState.error?.message} />
    </BaseField>
  )
}
