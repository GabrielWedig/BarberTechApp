import { Control, FieldValues, Path } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { MenuItem, Select } from '@mui/material'

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
      <Select
        {...control.register(name)}
        disabled={disabled}
        sx={{
          borderRadius: '8px',
          border: 'none',
          fontSize: '17px',
          backgroundColor: 'var(--white)',
          '& .MuiInputBase-input': {
            padding: '10px 20px'
          },
          '&.Mui-focused fieldset': {
            border: 'none'
          }
        }}
      >
        {options.map((o) => (
          <MenuItem value={o.value}>{o.name}</MenuItem>
        ))}
      </Select>
    </BaseField>
  )
}
