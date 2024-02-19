import { FieldValues, useForm } from 'react-hook-form'
import { Button, Modal, Option, SelectField, TextField } from '../..'
import * as S from './style'
import { useBarbers, useSnackbarContext, usingTryCatch } from '../../../hooks'
import { useEffect, useState } from 'react'

interface ScheduleModalProps {
  haircutId: string
  open: boolean
  onClose: () => void
}

interface ScheduleFormData {
  name: string
  barber: string
  date: string
  schedule: string
}

export const ScheduleModal = ({
  haircutId,
  open,
  onClose
}: ScheduleModalProps) => {
  const [barberOptions, setBarberOptions] = useState<Option[]>([])
  const [dateOptions, setDateOptions] = useState<Option[]>([])
  const [scheduleOptions, setScheduleOptions] = useState<Option[]>([])

  const { handleSubmit, control, watch, reset } = useForm<ScheduleFormData>()
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  const {
    getBarberOptions,
    getAvaliableDates,
    getAvaliableTimes,
    scheduleHaircut
  } = useBarbers()

  const barberField = watch('barber')
  const dateField = watch('date')

  useEffect(() => {
    if (open) {
      fetchBarberOptions()
    }
    return () => reset()
  }, [open])

  useEffect(() => {
    if (barberField) {
      fetchAvaliableDates(barberField)
    }
  }, [barberField])

  useEffect(() => {
    if (dateField) {
      fetchAvaliableTimes(barberField, dateField)
    }
  }, [dateField])

  const fetchBarberOptions = async () => {
    const { data, error } = await usingTryCatch(getBarberOptions())

    if (error || !data) {
      return
      // chama modal
    }

    const options = data.map((d) => ({ name: d.name, value: d.id }))
    setBarberOptions(options)
  }

  const fetchAvaliableDates = async (barberId: string) => {
    const { data, error } = await usingTryCatch(getAvaliableDates(barberId))

    if (error || !data) {
      return
      // chama modal
    }

    const options = data.map((date) => ({
      name: date.slice(0, -5),
      value: date
    }))
    setDateOptions(options)
  }

  const fetchAvaliableTimes = async (barberId: string, date: string) => {
    const { data, error } = await usingTryCatch(
      getAvaliableTimes(barberId, date)
    )

    if (error || !data) {
      return
      // chama modal
    }

    const options = data.map((schedule) => ({
      name: schedule,
      value: schedule
    }))
    setScheduleOptions(options)
  }

  const handleScheduleSubmit = async (values: FieldValues) => {
    const request = {
      haircutId: haircutId,
      name: values.name,
      dateTime: `${values.date} ${values.schedule}`//.slice(0, -3)}`
    }

    const { error } = await usingTryCatch(
      scheduleHaircut(values.barber, request)
    )

    if (error) {
      showErrorSnackbar('teste carai')
      return
      // chama modal
    }
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
            label="Nome completo:"
            placeholder="Digite seu nome"
          />
          <SelectField
            name="barber"
            control={control}
            label="Selecione um profissional:"
            options={barberOptions}
          />
          <div className="date-box">
            <SelectField
              name="date"
              control={control}
              label="Selecione a data:"
              options={dateOptions}
              disabled={!barberField}
            />
            <SelectField
              name="schedule"
              control={control}
              label="Selecione um horário:"
              options={scheduleOptions}
              disabled={!dateField}
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