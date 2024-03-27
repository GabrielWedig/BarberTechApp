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
import { InputField } from '../fields'
import { useForm } from 'react-hook-form'
import { Pagination, Visible } from '..'

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

  const onCloseModals = () => {
    setOpenCreateModal(false)
    fetchData(1)
  }

  const content: ContentType = {
    users: {
      name: 'Usuários',
      header: ['Nome', 'Email'],
      get: getAllUsers,
      modal: (
        <LoginModal
          open={openCreateModal}
          onClose={onCloseModals}
          type="register"
        />
      )
    },
    schedules: {
      name: 'Eventos',
      header: ['Nome', 'Barbeiro', 'Corte'],
      get: getAllSchedules,
      modal: <ScheduleModal open={openCreateModal} onClose={onCloseModals} />
    },
    haircuts: {
      name: 'Cortes',
      header: ['Nome', 'Sobre', 'Preço'],
      get: getAllHaircuts,
      modal: <HaircutModal open={openCreateModal} onClose={onCloseModals} />
    },
    feedbacks: {
      name: 'Avaliações',
      header: ['Comentário', 'Cliente', 'Estabelecimento', 'Corte', 'Barbeiro'],
      get: getAllFeedbacks
    },
    establishments: {
      name: 'Estabelecimentos',
      header: ['Endereço'],
      get: getAllEstablishments,
      modal: (
        <EstablishmentModal open={openCreateModal} onClose={onCloseModals} />
      )
    },
    barbers: {
      name: 'Barbeiros',
      header: ['Usuário', 'Contato', 'Instagram', 'Facebook', 'Twitter'],
      get: getAllBarbers,
      modal: <BarberModal open={openCreateModal} onClose={onCloseModals} />
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
    <S.ListBox>
      <h3>{content[type].name}</h3>
      <div className="filter-box">
        <InputField
          control={control}
          name="filter"
          placeholder="Pesquisar"
          onChange={(value) => fetchData(1, value as string)}
        />
        <Visible when={!!content[type].modal}>
          <Button type="secondary" onClick={() => setOpenCreateModal(true)}>
            Novo
          </Button>
        </Visible>
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
