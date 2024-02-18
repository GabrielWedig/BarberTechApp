import { Control, FieldValues, Path, UseFormSetValue } from 'react-hook-form'
import { BaseField } from '../base/BaseField'
import { Option } from '../select/SelectField'
import * as S from './style'
import { Swiper } from '../../swiper/Swiper'

interface ButtonGroupFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  disabled?: boolean
  options: Option[]
  setValue: UseFormSetValue<FieldValues>
}

export function ButtonGroupField<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  label,
  disabled,
  options,
  setValue
}: ButtonGroupFieldProps<TFieldValues>) {
  return (
    <BaseField label={label} disabled={disabled}>
      <S.ButtonGroupBox>
        <Swiper
          arrowColor="white"
          borderColor="blue"
          qntSlides={4}
          infinite={false}
        >
          {options.map((o) => (
            <button
              type="button"
              onClick={() => setValue(name, o.value)}
              disabled={disabled}
            >
              {o.name}
            </button>
          ))}
        </Swiper>
      </S.ButtonGroupBox>
      <input type="hidden" {...control.register(name)} />
    </BaseField>
  )
}
