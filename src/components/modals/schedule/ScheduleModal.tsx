import { FieldValues, useForm } from 'react-hook-form'
import {
  Button,
  ConfirmationModal,
  InputField,
  Modal,
  Option,
  SelectField,
  Visible
} from '../..'
import * as S from './style'
import {
  useBarbers,
  useEstablishments,
  useHaircuts,
  useSchedules,
  useTryCatch
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
  establishment: Option
  barber: Option
  date: string
  schedule: string
  haircut?: Option
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
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { handleSubmit, control, watch, reset, resetField } =
    useForm<ScheduleFormData>({
      resolver: yupResolver(getScheduleSchema(!!haircutId))
    })

  const { getAvaliableDates, getAvaliableTimes } = useBarbers()
  const { createSchedule } = useSchedules()
  const { getEstablishmentOptions, getBarberOptions } = useEstablishments()
  const { getHaircutOptions } = useHaircuts()
  const { fetchAndMapOptions, fetchWithMessage, fetchData } = useTryCatch()

  const establishmentField = watch('establishment')?.value
  const barberField = watch('barber')?.value
  const dateField = watch('date')

  useEffect(() => {
    return () =>
      reset({
        barber: { name: '', value: '' },
        establishment: { name: '', value: '' },
        haircut: { name: '', value: '' },
        date: '',
        name: '',
        schedule: ''
      })
  }, [])

  const fetchHaircutOptions = async (searchTerm?: string) => {
    if (!!haircutId) return []
    return await fetchAndMapOptions(getHaircutOptions(searchTerm))
  }

  const fetchEstablishmentOptions = async (searchTerm?: string) => {
    resetFields(['barber', 'date', 'schedule'])
    return await fetchAndMapOptions(getEstablishmentOptions(searchTerm))
  }

  const fetchBarberOptions = async (searchTerm?: string) => {
    if (!establishmentField) return []
    resetFields(['date', 'schedule'])
    return await fetchAndMapOptions(
      getBarberOptions(establishmentField, searchTerm)
    )
  }

  const fetchAvaliableDates = async (option: Option | null) => {
    resetFields(['schedule'])

    const barberId = option?.value
    if (!barberId) return []

    const { data, success } = await fetchData(getAvaliableDates(barberId))

    if (data && success) {
      const options = data?.map((d) => ({ name: d, value: d }))
      setOptions((current) => ({ ...current, date: options }))
    }
  }

  const fetchAvaliableTimes = async (date: string) => {
    const { data, success } = await fetchData(
      getAvaliableTimes(barberField, date)
    )

    if (data && success) {
      const options = data?.map((d) => ({ name: d, value: d }))
      setOptions((current) => ({ ...current, schedule: options }))
    }
  }

  const resetFields = (fields: OptionTypes[]) =>
    fields.forEach((field) => {
      resetField(field)
    })

  const handleScheduleSubmit = async (values: FieldValues) => {
    const request = {
      barberId: values.barber.value,
      haircutId: haircutId ?? values.haircut.value,
      name: values.name,
      dateTime: `${values.date} ${values.schedule}`
    }

    await fetchWithMessage(
      createSchedule(request),
      'Corte agendado com sucesso!'
    )
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
              disabled={!establishmentField}
              onChange={(value) => fetchAvaliableDates(value)}
            />
          </div>
          <div className="box">
            <SelectField
              name="date"
              control={control}
              label="Data"
              options={options.date}
              disabled={!establishmentField || !barberField}
              onChange={(value) => fetchAvaliableTimes(value)}
            />
            <SelectField
              name="schedule"
              control={control}
              label="Horário"
              options={options.schedule}
              disabled={!establishmentField || !barberField || !dateField}
            />
          </div>
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Agendar horário
          </Button>
          <ConfirmationModal
            handleConfirm={handleSubmit(handleScheduleSubmit)}
            onClose={() => setOpenModal(false)}
            open={openModal}
          />
        </form>
      </S.ScheduleBox>
    </Modal>
  )
}
