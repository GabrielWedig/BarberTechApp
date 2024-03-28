import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { FieldError } from '..'

interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  options: Option[]
  disabled?: boolean
  onChange?: (value: string) => void
}

export interface Option {
  name: string
  value: string
}

export function SelectField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  options,
  disabled,
  onChange
}: SelectFieldProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  const changeEventHandler = ({ target }: SelectChangeEvent<unknown>) => {
    try {
      onChange?.call(null, target.value as string)
    } finally {
      field.onChange(target.value)
    }
  }

  return (
    <BaseField label={label} disabled={disabled}>
      <Select
        {...field}
        disabled={disabled}
        className={fieldState.error ? 'error' : ''}
        value={field.value ?? ''}
        onChange={changeEventHandler}
      >
        {options.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.name}
          </MenuItem>
        ))}
      </Select>
      <FieldError message={fieldState.error?.message} />
    </BaseField>
  )
}
