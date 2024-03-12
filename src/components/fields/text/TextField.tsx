import { Control, ControllerRenderProps, FieldValues, Path, PathValue, useController } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { FieldError } from '..'
import { ChangeEvent } from 'react'

interface TextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (
    value: string,
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  ) => void
}

export function TextField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
  onChange
}: TextFieldProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  // TODO: revisar e aplicar para os outros campos
  const changeEventHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    try {
      onChange?.call(null, event.target.value, field)
    } finally {
      field.onChange(
        event.target.value as PathValue<TFieldValues, Path<TFieldValues>>
      )
    }
  }

  return (
    <BaseField label={label} disabled={disabled}>
      <input
        {...field}
        placeholder={placeholder ?? label}
        disabled={disabled}
        className={fieldState.error ? 'error' : ''}
        onChange={changeEventHandler}
      />
      <FieldError message={fieldState.error?.message} />
    </BaseField>
  )
}
