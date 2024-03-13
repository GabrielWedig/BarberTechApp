import { FieldValues, useForm } from 'react-hook-form'
import { Button, Modal, Option, SelectField, TextField, Visible } from '../..'
import * as S from './style'
import {
  useBarbers,
  useEstablishments,
  useSchedules,
  useSnackbarContext,
  usingTryCatch
} from '../../../hooks'
import { useEffect, useState } from 'react'
import { scheduleSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'

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
  haircut: string
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

  const [options, setOptions] = useState<Options>(defaultOptions)

  const { handleSubmit, control, watch, reset } = useForm<ScheduleFormData>({
    resolver: yupResolver(scheduleSchema)
  })

  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()
  const { getAvaliableDates, getAvaliableTimes } = useBarbers()
  const { createSchedule } = useSchedules()
  const { getEstablishmentOptions, getBarberOptions } = useEstablishments()

  const establishmentField = watch('establishment')
  const barberField = watch('barber')
  const dateField = watch('date')
  const scheduleField = watch('schedule')

  useEffect(() => {
    if (!open) return
    fetchEstablishmentOptions()
    return () => reset()
  }, [open])

  useEffect(() => {
    if (!establishmentField) return
    fetchBarberOptions(establishmentField)
  }, [establishmentField])

  useEffect(() => {
    if (!barberField) return
    fetchAvaliableDates(barberField)
  }, [barberField])

  useEffect(() => {
    if (!dateField) return
    fetchAvaliableTimes(barberField, dateField)
  }, [dateField])

  const fetchEstablishmentOptions = async () => {
    const { data, error } = await usingTryCatch(getEstablishmentOptions())

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }

    const options = data.map((establishment) => ({
      name: establishment.name,
      value: establishment.id
    }))
    fillOptions('establishment', options)
  }

  const fetchBarberOptions = async (establishmentId: string) => {
    const { data, error } = await usingTryCatch(
      getBarberOptions(establishmentId)
    )

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }

    const options = data.map((barber) => ({
      name: barber.name,
      value: barber.id
    }))
    fillOptions('barber', options)
  }

  const fetchAvaliableDates = async (barberId: string) => {
    const { data, error } = await usingTryCatch(getAvaliableDates(barberId))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }

    const options = data.map((date) => ({
      name: date,
      value: date
    }))
    fillOptions('date', options)
  }

  const fetchAvaliableTimes = async (barberId: string, date: string) => {
    const { data, error } = await usingTryCatch(
      getAvaliableTimes(barberId, date)
    )

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }

    const options = data.map((schedule) => ({
      name: schedule,
      value: schedule
    }))
    fillOptions('schedule', options)
  }

  const fillOptions = (type: OptionTypes, options: Option[]) =>
    setOptions((current) => ({ ...current, [type]: options }))

  const handleScheduleSubmit = async (values: FieldValues) => {
    const request = {
      barberId: '', // TODO: melhorar
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
          <TextField
            name="name"
            control={control}
            label="Nome completo"
            placeholder="Digite seu nome"
          />
          <div className="box">
            <SelectField
              name="establishment"
              control={control}
              label="Estabelecimento"
              options={options.establishment}
            />
            <SelectField
              name="barber"
              control={control}
              label="Profissional"
              options={options.barber}
              disabled={!establishmentField}
            />
          </div>
          <div className="box">
            <SelectField
              name="date"
              control={control}
              label="Data"
              options={options.date}
              disabled={!barberField}
            />
            <SelectField
              name="schedule"
              control={control}
              label="Horário"
              options={options.schedule}
              disabled={!dateField}
            />
          </div>
          <Visible when={!haircutId}>
            <SelectField
              name="haircut"
              control={control}
              label="Escolha um corte"
              options={options.haircut}
              disabled={!scheduleField}
            />
          </Visible>
        </form>
        <Button type="primary" onClick={handleSubmit(handleScheduleSubmit)}>
          Agendar horário
        </Button>
      </S.ScheduleBox>
    </Modal>
  )
}
