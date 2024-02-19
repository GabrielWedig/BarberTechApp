import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { MenuItem, Select } from '@mui/material'
import { itemStyle, selectStyle } from './style'
import { FieldError } from '..'

interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  disabled?: boolean
  options: Option[]
}

export interface Option {
  name: string
  value: any
}

export function SelectField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  disabled,
  options
}: SelectFieldProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  return (
    <BaseField label={label} disabled={disabled}>
      <Select
        {...field}
        disabled={disabled}
        sx={selectStyle}
        className={fieldState.error ? 'error' : ''}
      >
        {options.map((o) => (
          <MenuItem sx={itemStyle} value={o.value}>
            {o.name}
          </MenuItem>
        ))}
      </Select>
      <FieldError message={fieldState.error?.message} />
    </BaseField>
  )
}
