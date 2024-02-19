import { Control, FieldValues, Path } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { MenuItem, Select } from '@mui/material'
import { itemStyle, selectStyle } from './style'

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
  return (
    <BaseField label={label} disabled={disabled}>
      <Select {...control.register(name)} disabled={disabled} sx={selectStyle}>
        {options.map((o) => (
          <MenuItem sx={itemStyle} value={o.value}>
            {o.name}
          </MenuItem>
        ))}
      </Select>
    </BaseField>
  )
}
