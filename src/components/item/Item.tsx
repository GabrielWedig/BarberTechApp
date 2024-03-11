import { Check, Close, Delete, Edit } from '@mui/icons-material'
import * as S from './style'
import { useEffect, useState } from 'react'
import { ManageTypes } from '../../pages/profile/manage/Manage'
import {
  useBarbers,
  useEstablishments,
  useFeedbacks,
  useHaircuts,
  useSchedules,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../hooks'
import {
  BarberModal,
  ConfirmationModal,
  EstablishmentModal,
  GetResponse,
  HaircutModal,
  LoginModal
} from '..'

interface ItemProps {
  type: ManageTypes
  data: GetResponse
  shouldEdit?: boolean
  shouldDelete?: boolean
  shouldCancel?: boolean
  shouldComplete?: boolean
}

type ConfirmationModal = 'delete' | 'complete' | 'cancel' | 'closed'

export const Item = ({
  type,
  data,
  shouldEdit,
  shouldDelete,
  shouldCancel,
  shouldComplete
}: ItemProps) => {
  const [editModal, setEditModal] = useState<boolean>(false)
  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModal>('closed')
  const [confirm, setConfirm] = useState<boolean>(false) // TODO: talvez juntar com o state de cima se precisar fazer um para cada

  const { deleteUser } = useUsers()
  const { cancelSchedule, completeSchedule } = useSchedules()
  const { deleteHaircut } = useHaircuts()
  const { deleteFeedback } = useFeedbacks()
  const { deleteEstablishment } = useEstablishments()
  const { deleteBarber } = useBarbers()

  const { showErrorSnackbar } = useSnackbarContext()

  useEffect(() => {
    handleConfirm()
  }, [!!confirm])

  const content = {
    users: {
      modal: (
        <LoginModal
          open={editModal}
          onClose={() => setEditModal(false)}
          type="register"
          userId={data.id}
        />
      ),
      columns: [data.name, data.email],
      delete: deleteUser
    },
    schedules: {
      modal: null,
      columns: [data.name, data.barberName, data.haircutName],
      delete: null
    },
    haircuts: {
      modal: (
        <HaircutModal
          open={editModal}
          onClose={() => setEditModal(false)}
          haircutId={data.id}
        />
      ),
      columns: [data.name, data.about, data.price],
      delete: deleteHaircut
    },
    feedbacks: {
      modal: null,
      columns: [
        data.name,
        data.comment,
        data.establishmentName,
        data.userName,
        data.haircutName,
        data.barberName
      ],
      delete: deleteFeedback
    },
    establishments: {
      modal: (
        <EstablishmentModal
          open={editModal}
          onClose={() => setEditModal(false)}
          establishmentId={data.id}
        />
      ),
      columns: [data.address],
      delete: deleteEstablishment
    },
    barbers: {
      modal: (
        <BarberModal
          open={editModal}
          onClose={() => setEditModal(false)}
          barberId={data.id}
        />
      ),
      columns: [
        data.name,
        data.userName,
        data.contact,
        data.social?.instagram,
        data.social?.facebook,
        data.social?.twitter
      ],
      delete: deleteBarber
    }
  }

  const actions = {
    delete: content[type].delete,
    complete: completeSchedule,
    cancel: cancelSchedule,
    closed: null
  }

  const handleConfirm = async () => {
    const action = actions[confirmationModal]

    if (!action) return

    const { error } = await usingTryCatch(action(data.id ?? ''))

    if (error) {
      showErrorSnackbar(error)
    }
  }

  return (
    <S.ItemBox>
      {content[type].columns.map((column) => (
        <span>{column}</span>
      ))}
      {shouldEdit ?? (
        <button onClick={() => setEditModal(true)}>
          <Edit />
        </button>
      )}
      {shouldDelete ?? (
        <button onClick={() => setConfirmationModal('delete')}>
          <Delete />
        </button>
      )}
      {shouldCancel ?? (
        <button onClick={() => setConfirmationModal('complete')}>
          <Check />
        </button>
      )}
      {shouldComplete ?? (
        <button onClick={() => setConfirmationModal('cancel')}>
          <Close />
        </button>
      )}
      {content[type].modal}
      <ConfirmationModal
        open={confirmationModal !== 'closed'}
        onClose={() => setConfirmationModal('closed')}
        setConfirm={setConfirm}
      />
    </S.ItemBox>
  )
}
