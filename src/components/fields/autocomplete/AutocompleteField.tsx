import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import { BaseField, FieldError } from '..'
import { SyntheticEvent, useEffect, useState } from 'react'

interface Option {
  name: string
  value: any
}

interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  search: (searchTerm?: string) => Promise<Option[]>
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function AutocompleteField<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  label,
  search,
  onChange,
  placeholder,
  disabled
}: SelectFieldProps<TFieldValues>) {
  const [options, setOptions] = useState<Option[]>([])
  const { fieldState, field } = useController({ name, control })

  useEffect(() => {
    searchEventHandler(null, '')
  }, [])

  const changeEventHandler = (
    _: SyntheticEvent<Element, Event>,
    value: Option | null
  ) => {
    try {
      onChange?.call(null, value?.value)
    } finally {
      field.onChange(value?.value)
    }
  }

  const searchEventHandler = async (
    _: SyntheticEvent<Element, Event> | null,
    searchTerm: string
  ) => {
    const options = await search(searchTerm)
    setOptions(options)
  }

  return (
    <BaseField label={label} disabled={disabled}>
      <Autocomplete
        onChange={changeEventHandler}
        onInputChange={searchEventHandler}
        options={options}
        getOptionLabel={(option) => option?.name}
        disabled={disabled}
        className={fieldState.error ? 'error' : ''}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            placeholder={placeholder ?? label}
          />
        )}
      />
      <FieldError message={fieldState.error?.message} />
    </BaseField>
  )
}
