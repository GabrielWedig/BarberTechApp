import { useEffect, useState } from 'react'
import { Button, LoginModal, UserMenu, Visible } from '..'
import { ReactComponent as Logo } from '../../img/logo.svg'
import { scrollToSection } from '../../utils'
import * as S from './style'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useNavigate } from 'react-router-dom'
import {
  PersonOutlined,
  StarBorderOutlined,
  ContentCutOutlined,
  LogoutOutlined,
  CalendarMonthOutlined
} from '@mui/icons-material'
import {
  UserData,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../hooks'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [user, setUser] = useState<UserData>()

  const isAuthenticated = useIsAuthenticated()
  const userId = useAuthUser<string>()

  const navigate = useNavigate()
  const { getById } = useUsers()
  const { showErrorSnackbar } = useSnackbarContext()

  useEffect(() => {
    if (isAuthenticated()) {
      fetchUser()
    }
  }, [])

  const fetchUser = async () => {
    const { data, error } = await usingTryCatch(getById(userId ?? ''))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setUser(data)
  }

  // TODO: tirar trues quando back tiver pronto
  const canShow = {
    reviews: user?.status === 'Client' || true,
    haircuts: user?.status === 'Barber' || user?.status === 'Client' || true,
    calendar: user?.status === 'Barber' || true
  }

  return (
    <>
      <S.Header>
        <Logo />
        <nav>
          <Button type="transparent" onClick={() => scrollToSection('home')}>
            Home
          </Button>
          <Button
            type="transparent"
            onClick={() => scrollToSection('services')}
          >
            Serviços
          </Button>
          <Button type="transparent" onClick={() => scrollToSection('about')}>
            Sobre
          </Button>
          <Button type="transparent" onClick={() => scrollToSection('footer')}>
            Contatos
          </Button>
          <Button type="transparent" onClick={() => navigate('/depo')}>
            Depoimentos
          </Button>
        </nav>
        <Visible when={isAuthenticated()}>
          <UserMenu setShowMenu={setShowMenu} user={user} />
        </Visible>
        <Visible when={!isAuthenticated()}>
          <Button onClick={() => setOpenModal(true)}>Login</Button>
        </Visible>
      </S.Header>
      <LoginModal open={openModal} onClose={() => setOpenModal(false)} />
      <S.Menu showMenu={showMenu} onMouseLeave={() => setShowMenu(false)}>
        <button className="row">
          <PersonOutlined />
          <span>Perfil</span>
        </button>
        <Visible when={canShow.reviews}>
          <button className="row">
            <StarBorderOutlined />
            <span>Minhas avaliações</span>
          </button>
        </Visible>
        <Visible when={canShow.haircuts}>
          <button className="row">
            <ContentCutOutlined />
            <span>Meus cortes</span>
          </button>
        </Visible>
        <Visible when={canShow.calendar}>
          <button className="row">
            <CalendarMonthOutlined />
            <span>Calendário</span>
          </button>
        </Visible>
        <button className="row">
          <LogoutOutlined />
          <span>Sair</span>
        </button>
      </S.Menu>
    </>
  )
}
