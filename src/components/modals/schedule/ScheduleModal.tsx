import { FieldValues, useForm } from 'react-hook-form'
import { Button, Modal, TextField } from '../..'
import * as S from './style'

interface ScheduleModalProps {
  open: boolean
  onClose: () => void
}

export const ScheduleModal = ({ open, onClose }: ScheduleModalProps) => {
  const { handleSubmit, control } = useForm() //<LoginFormData>()

  //const { login } = useUsers()

  const handleScheduleSubmit = async (values: FieldValues) => {
    const request = {
      email: values.email,
      password: values.password
    }

    //const { error, data } = await usingTryCatch(login(request))

    console.log(values)

    // if (error) {
    //   return
    //   // chama modal
    // }
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
          <TextField
            name="barber"
            control={control}
            label="Selecione um profissional:"
            disabled={true}
          />
          <TextField name="date" control={control} label="Selecione a data:" />
          <TextField
            name="schedule"
            control={control}
            label="Selecione um horário:"
          />
          <Button type="primary" onClick={handleSubmit(handleScheduleSubmit)}>
            Agendar horário
          </Button>
        </form>
      </S.ScheduleBox>
    </Modal>
  )
}
