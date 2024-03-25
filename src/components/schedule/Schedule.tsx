import { useState } from 'react'
import {
  ScheduleData,
  useSchedules,
  useSnackbarContext,
  usingTryCatch
} from '../../hooks'
import * as S from './style'
import { Check, Close } from '@mui/icons-material'
import { ConfirmationModal } from '../modals'

interface ScheduleProps {
  time: string
  schedule: ScheduleData | null
  fetchCalendar: () => Promise<void>
}

type ConfirmationModal = 'complete' | 'cancel' | 'closed'

export const Schedule = ({ time, schedule, fetchCalendar }: ScheduleProps) => {
  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModal>('closed')

  const { cancelSchedule, completeSchedule } = useSchedules()
  const { showErrorSnackbar } = useSnackbarContext()

  const handleConfirm = async (value: boolean) => {
    const action =
      confirmationModal === 'cancel' ? cancelSchedule : completeSchedule

    if (!action || !value) return

    const { error } = await usingTryCatch(action(schedule?.id ?? ''))

    if (error) {
      showErrorSnackbar(error)
    }
    fetchCalendar()
  }

  return (
    <S.ScheduleBox hasClient={!!schedule}>
      <span>{time + ' |'}</span>
      <span className="name">{schedule?.userName ?? '[Livre]'}</span>
      <div className="buttons">
        <button
          disabled={!schedule}
          onClick={() => setConfirmationModal('cancel')}
        >
          <Close fontSize="small" />
        </button>
        <button
          disabled={!schedule}
          onClick={() => setConfirmationModal('complete')}
        >
          <Check fontSize="small" />
        </button>
      </div>
      <ConfirmationModal
        open={confirmationModal !== 'closed'}
        onClose={() => setConfirmationModal('closed')}
        handleConfirm={handleConfirm}
      />
    </S.ScheduleBox>
  )
}
