import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import { BaseField, FieldError } from '..'
import { SyntheticEvent, useEffect, useState } from 'react'

interface Option {
  name: string
  value: string
}

interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  search: (searchTerm?: string) => Promise<Option[]>
  onChange?: (value: Option | null) => void
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
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const { fieldState, field } = useController({ name, control })

  useEffect(() => {
    if (disabled) {
      setSelectedOption(null)
    }
    searchEventHandler(null, '')
  }, [disabled])

  const changeEventHandler = (
    _: SyntheticEvent<Element, Event>,
    option: Option | null
  ) => {
    try {
      onChange?.call(null, option)
    } finally {
      field.onChange(option)
      setSelectedOption(option)
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
        {...field}
        onChange={changeEventHandler}
        onInputChange={searchEventHandler}
        options={options}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disabled={disabled}
        className={fieldState.error ? 'error' : ''}
        value={selectedOption}
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
