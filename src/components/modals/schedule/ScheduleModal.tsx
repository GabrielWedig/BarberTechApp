import { FieldValues, useForm } from 'react-hook-form'
import { Button, InputField, Modal, Option, SelectField, Visible } from '../..'
import * as S from './style'
import {
  useBarbers,
  useEstablishments,
  useHaircuts,
  useSchedules,
  useSnackbarContext,
  usingTryCatch
} from '../../../hooks'
import { useEffect, useState } from 'react'
import { getScheduleSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { AutocompleteField } from '../../fields/autocomplete/AutocompleteField'

interface ScheduleModalProps {
  haircutId?: string
  open: boolean
  onClose: () => void
}

interface ScheduleFormData {
  name?: string
  establishment: string
  barber: string
  date: string
  schedule: string
  haircut?: string
}

type OptionTypes = 'establishment' | 'barber' | 'date' | 'schedule' | 'haircut'

type Options = {
  [K in OptionTypes]: Option[]
}

export const ScheduleModal = ({
  haircutId,
  open,
  onClose
}: ScheduleModalProps) => {
  const defaultOptions = {
    establishment: [],
    barber: [],
    date: [],
    schedule: [],
    haircut: []
  }

  const defaultValues = {
    barber: '',
    date: '',
    establishment: '',
    haircut: '',
    name: '',
    schedule: ''
  }

  const [options, setOptions] = useState<Options>(defaultOptions)

  const { handleSubmit, control, watch, reset, resetField } =
    useForm<ScheduleFormData>({
      resolver: yupResolver(getScheduleSchema(!!haircutId)),
      defaultValues
    })

  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()
  const { getAvaliableDates, getAvaliableTimes } = useBarbers()
  const { createSchedule } = useSchedules()
  const { getEstablishmentOptions, getBarberOptions } = useEstablishments()
  const { getHaircutOptions } = useHaircuts()

  const establishmentField = watch('establishment')
  const barberField = watch('barber')
  const dateField = watch('date')

  useEffect(() => {
    return () => reset()
  }, [])

  useEffect(() => {
    if (barberField) {
      fetchAvaliableDates()
    }
  }, [barberField])

  useEffect(() => {
    if (dateField) {
      fetchAvaliableTimes()
    }
  }, [dateField])

  const fetchHaircutOptions = async (searchTerm?: string) => {
    if (!!haircutId) return []

    const { data, error } = await usingTryCatch(getHaircutOptions(searchTerm))

    if (error || !data) {
      showErrorSnackbar(error)
      return []
    }

    return data.map((haircut) => ({
      name: haircut.name,
      value: haircut.id
    }))
  }

  const fetchEstablishmentOptions = async (searchTerm?: string) => {
    const { data, error } = await usingTryCatch(
      getEstablishmentOptions(searchTerm)
    )

    if (error || !data) {
      showErrorSnackbar(error)
      return []
    }

    return data.map((establishment) => ({
      name: establishment.name,
      value: establishment.id
    }))
  }

  const fetchBarberOptions = async (searchTerm?: string) => {
    const { data, error } = await usingTryCatch(
      getBarberOptions(establishmentField, searchTerm)
    )

    if (error || !data) {
      showErrorSnackbar(error)
      return []
    }

    resetFields(['barber', 'date', 'schedule'])

    return data.map((barber) => ({
      name: barber.name,
      value: barber.id
    }))
  }

  const fetchAvaliableDates = async () => {
    const { data, error } = await usingTryCatch(getAvaliableDates(barberField))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }

    const options = data.map((date) => ({
      name: date,
      value: date
    }))

    resetFields(['date', 'schedule'])
    setOptions((current) => ({ ...current, date: options }))
  }

  const fetchAvaliableTimes = async () => {
    const { data, error } = await usingTryCatch(
      getAvaliableTimes(barberField, dateField)
    )

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }

    const options = data.map((schedule) => ({
      name: schedule,
      value: schedule
    }))

    resetFields(['schedule'])
    setOptions((current) => ({ ...current, schedule: options }))
  }

  const resetFields = (fields: OptionTypes[]) => {
    const newOptions = fields.reduce(
      (acc, field) => {
        resetField(field)
        return { ...acc, [field]: [] }
      },
      { ...options }
    )
    setOptions(newOptions)
  }

  const handleScheduleSubmit = async (values: FieldValues) => {
    const request = {
      barberId: values.barber,
      haircutId: haircutId ?? values.haircut,
      name: values.name,
      dateTime: `${values.date} ${values.schedule}`
    }

    const { error } = await usingTryCatch(createSchedule(request))

    if (error) {
      showErrorSnackbar(error)
      return
    }

    showSuccessSnackbar('Corte agendado com sucesso!')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <S.ScheduleBox>
        <h3>Agendar horário</h3>
        <form>
          <InputField
            name="name"
            control={control}
            label="Nome completo"
            placeholder="Nome de quem irá cortar (opcional)"
          />
          <Visible when={!haircutId}>
            <AutocompleteField
              name="haircut"
              control={control}
              label="Escolha um corte"
              search={fetchHaircutOptions}
            />
          </Visible>
          <div className="box">
            <AutocompleteField
              name="establishment"
              control={control}
              label="Estabelecimento"
              search={fetchEstablishmentOptions}
            />
            <AutocompleteField
              name="barber"
              control={control}
              label="Profissional"
              search={fetchBarberOptions}
            />
          </div>
          <div className="box">
            <SelectField
              name="date"
              control={control}
              label="Data"
              options={options.date}
              disabled={!establishmentField || !barberField}
            />
            <SelectField
              name="schedule"
              control={control}
              label="Horário"
              options={options.schedule}
              disabled={!establishmentField || !barberField || !dateField}
            />
          </div>
          <Button type="primary" onClick={handleSubmit(handleScheduleSubmit)}>
            Agendar horário
          </Button>
        </form>
      </S.ScheduleBox>
    </Modal>
  )
}
