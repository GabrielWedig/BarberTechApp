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
  ScheduleModal
} from '../modals'
import { ManageTypes } from '../../pages/profile'
import { Button } from '../button/Button'
import { TextField } from '../fields'
import { useForm } from 'react-hook-form'
import { Pagination } from '..'

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
    modal?: JSX.Element
  }
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

  const { control } = useForm()

  const content: ContentType = {
    users: {
      name: 'Usuários',
      header: ['Nome', 'Email'],
      get: getAllUsers,
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
      get: getAllFeedbacks
    },
    establishments: {
      name: 'Estabelecimentos',
      header: ['Endereço'],
      get: getAllEstablishments,
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

  const fetchData = async (page: number, searchTerm?: string) => {
    const get = content[type].get

    const { data, error } = await usingTryCatch(get(page, pageSize, searchTerm))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setData((current) => ({ ...current, [type]: data }))
  }

  return (
    <S.ListBox minHeigth={data[type].totalCount < 5 ? 'max-content' : '280px'}>
      <h3>{content[type].name}</h3>
      <div className="filter-box">
        <TextField
          control={control}
          name="filter"
          placeholder="Pesquisar"
          onChange={(value) => fetchData(1, value)}
        />
        <Button type="secondary" onClick={() => setOpenCreateModal(true)}>
          Novo
        </Button>
      </div>
      <div className="table-header">
        {content[type].header.map((item) => (
          <span>{item}</span>
        ))}
      </div>
      <div className="table-content">
        {data[type].items.map((item) => (
          <Item key={item.id} type={type} data={item} fetchData={fetchData} />
        ))}
      </div>
      <Pagination
        totalCount={data[type].totalCount ?? 0}
        pageSize={pageSize}
        handleChange={fetchData}
      />
      {content[type].modal}
    </S.ListBox>
  )
}
