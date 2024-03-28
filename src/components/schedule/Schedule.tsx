import { useState } from 'react'
import { ScheduleData, useSchedules, useTryCatch } from '../../hooks'
import * as S from './style'
import { Check, Close } from '@mui/icons-material'
import { ConfirmationModal } from '../modals'

interface ScheduleProps {
  time: string
  schedule: ScheduleData | null
  fetchCalendar: () => void
}

type ConfirmationModal = 'complete' | 'cancel' | 'closed'

export const Schedule = ({ time, schedule, fetchCalendar }: ScheduleProps) => {
  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModal>('closed')

  const { cancelSchedule, completeSchedule } = useSchedules()
  const { fetchData } = useTryCatch()

  const handleConfirm = async () => {
    const action =
      confirmationModal === 'cancel' ? cancelSchedule : completeSchedule

    if (!action) return

    const { success } = await fetchData(action(schedule?.id ?? ''))

    if (success) {
      fetchCalendar()
    }
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
