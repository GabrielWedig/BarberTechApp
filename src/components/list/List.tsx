import { useEffect, useState } from 'react'
import {
  BarbersData,
  EstablishmentsData,
  EventSchedulesData,
  FeedbacksData,
  HaircutsData,
  Paged,
  UsersData,
  useBarbers,
  useEstablishments,
  useFeedbacks,
  useHaircuts,
  useSchedules,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../hooks'
import { Item } from '../item/Item'
import * as S from './style'
import {
  BarberModal,
  EstablishmentModal,
  HaircutModal,
  LoginModal,
  ScheduleModal,
  UserModal
} from '../modals'
import { ManageTypes } from '../../pages/profile'

interface ListProps {
  type: ManageTypes
}

export type GetResponse = Partial<
  UsersData &
    EventSchedulesData &
    HaircutsData &
    FeedbacksData &
    EstablishmentsData &
    BarbersData
>

type Get = (
  page: number,
  pageSize: number,
  searchTerm?: string
) => Promise<Paged<GetResponse[]>>

type ContentType = {
  [K in ManageTypes]: {
    name: string
    header: string[]
    get: Get
    should: ShouldType
    modal?: JSX.Element
  }
}

type ShouldType = {
  edit?: boolean
  delete?: boolean
  cancel?: boolean
  complete?: boolean
}

type Data = {
  [K in ManageTypes]: Paged<GetResponse[]>
}

export function List({ type }: ListProps) {
  const pagedDefault = {
    items: [],
    page: 0,
    pageSize: 0,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false
  }

  const defaultValues = {
    users: pagedDefault,
    schedules: pagedDefault,
    haircuts: pagedDefault,
    feedbacks: pagedDefault,
    establishments: pagedDefault,
    barbers: pagedDefault
  }

  const [data, setData] = useState<Data>(defaultValues)
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)

  const { getAllUsers } = useUsers()
  const { getAllSchedules } = useSchedules()
  const { getAllHaircuts } = useHaircuts()
  const { getAllFeedbacks } = useFeedbacks()
  const { getAllEstablishments } = useEstablishments()
  const { getAllBarbers } = useBarbers()

  const { showErrorSnackbar } = useSnackbarContext()
  const pageSize = 5

  const content: ContentType = {
    users: {
      name: 'Usuários',
      header: ['Nome', 'Email'],
      get: getAllUsers,
      should: { edit: true, delete: true },
      modal: (
        <LoginModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          type="register"
        />
      )
    },
    schedules: {
      name: 'Eventos',
      header: ['Nome', 'Barbeiro', 'Corte'],
      get: getAllSchedules,
      should: { cancel: true, complete: true },
      modal: (
        <ScheduleModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        />
      )
    },
    haircuts: {
      name: 'Cortes',
      header: ['Nome', 'Sobre', 'Preço'],
      get: getAllHaircuts,
      should: { edit: true, delete: true },
      modal: (
        <HaircutModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        />
      )
    },
    feedbacks: {
      name: 'Avaliações',
      header: [
        'Comentário',
        'Nome',
        'Estabelecimento',
        'Cliente',
        'Corte',
        'Barbeiro'
      ],
      get: getAllFeedbacks,
      should: { delete: true }
    },
    establishments: {
      name: 'Estabelecimentos',
      header: ['Endereço'],
      get: getAllEstablishments,
      should: { edit: true, delete: true },
      modal: (
        <EstablishmentModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        />
      )
    },
    barbers: {
      name: 'Barbeiros',
      header: [
        'Nome',
        'Cliente',
        'Contato',
        'Instagram',
        'Facebook',
        'Twitter'
      ],
      get: getAllBarbers,
      should: { edit: true, delete: true },
      modal: (
        <BarberModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        />
      )
    }
  }

  useEffect(() => {
    fetchData(1)
  }, [])

  const fetchData = async (page: number) => {
    const get = content[type].get

    const { data, error } = await usingTryCatch(get(page, pageSize))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setData((current) => ({ ...current, [type]: data }))
  }

  return (
    <S.ListBox>
      <h3>{content[type].name}</h3>
      <button onClick={() => setOpenCreateModal(true)}>Novo</button>
      <div className="header">
        {content[type].header.map((item) => (
          <span>{item}</span>
        ))}
      </div>
      {data[type].items.map((item) => (
        <Item
          type={type}
          data={item}
          shouldCancel={content[type].should.cancel}
          shouldComplete={content[type].should.complete}
          shouldDelete={content[type].should.delete}
          shouldEdit={content[type].should.edit}
        />
      ))}
      {content[type].modal}
    </S.ListBox>
  )
}
