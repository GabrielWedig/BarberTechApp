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
  LoginModal,
  Visible
} from '..'

interface ItemProps {
  type: ManageTypes
  data: GetResponse
  fetchData: (page: number, searchTerm?: string) => Promise<void>
}

type ContentType = {
  [K in ManageTypes]: {
    columns: any[]
    delete?: (id: string) => Promise<void>
    modal?: JSX.Element
    should: {
      edit?: boolean
      delete?: boolean
      cancel?: boolean
      complete?: boolean
    }
  }
}

type ConfirmationModal = 'delete' | 'complete' | 'cancel' | 'closed'

export const Item = ({ type, data, fetchData }: ItemProps) => {
  const [editModal, setEditModal] = useState<boolean>(false)
  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModal>('closed')

  const { deleteUser } = useUsers()
  const { cancelSchedule, completeSchedule } = useSchedules()
  const { deleteHaircut } = useHaircuts()
  const { deleteFeedback } = useFeedbacks()
  const { deleteEstablishment } = useEstablishments()
  const { deleteBarber } = useBarbers()

  const { showErrorSnackbar } = useSnackbarContext()

  const content: ContentType = {
    users: {
      modal: (
        <LoginModal
          open={editModal}
          onClose={() => setEditModal(false)}
          type="edit"
          userId={data.id}
        />
      ),
      columns: [data.name, data.email],
      delete: deleteUser,
      should: { edit: true, delete: true }
    },
    schedules: {
      columns: [data.name, data.barberName, data.haircutName],
      should: { cancel: true, complete: true }
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
      delete: deleteHaircut,
      should: { edit: true, delete: true }
    },
    feedbacks: {
      columns: [
        data.name,
        data.comment,
        data.establishmentName,
        data.userName,
        data.haircutName,
        data.barberName
      ],
      delete: deleteFeedback,
      should: { delete: true }
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
      delete: deleteEstablishment,
      should: { edit: true, delete: true }
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
      delete: deleteBarber,
      should: { edit: true, delete: true }
    }
  }

  const actions = {
    delete: content[type].delete,
    complete: completeSchedule,
    cancel: cancelSchedule,
    closed: null
  }

  const handleConfirm = async (value: boolean) => {
    const action = actions[confirmationModal]

    if (!action || !value) return

    const { error } = await usingTryCatch(action(data.id ?? ''))

    if (error) {
      showErrorSnackbar(error)
    }
    fetchData(1)
  }

  return (
    <S.ItemBox>
      {content[type].columns.map((column) =>
        column ? (
          <span>{column}</span>
        ) : (
          <span className="null">[Não informado.]</span>
        )
      )}
      <div className="buttons-box">
        <Visible when={!!content[type].should.edit}>
          <button onClick={() => setEditModal(true)}>
            <Edit />
          </button>
        </Visible>
        <Visible when={!!content[type].should.delete}>
          <button onClick={() => setConfirmationModal('delete')}>
            <Delete />
          </button>
        </Visible>
        <Visible when={!!content[type].should.complete}>
          <button onClick={() => setConfirmationModal('complete')}>
            <Check />
          </button>
        </Visible>
        <Visible when={!!content[type].should.cancel}>
          <button onClick={() => setConfirmationModal('cancel')}>
            <Close />
          </button>
        </Visible>
      </div>
      {content[type].modal}
      <ConfirmationModal
        open={confirmationModal !== 'closed'}
        onClose={() => setConfirmationModal('closed')}
        handleConfirm={handleConfirm}
      />
    </S.ItemBox>
  )
}
