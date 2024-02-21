import {
  CalendarMonthOutlined,
  ContentCutOutlined,
  LogoutOutlined,
  PersonOutlined,
  StarBorderOutlined
} from '@mui/icons-material'
import { UserData } from '../../hooks'
import { MenuType, Visible } from '..'
import * as S from './style'
import useSignOut from 'react-auth-kit/hooks/useSignOut'

interface MenuProps {
  user?: UserData
  showMenu: MenuType
  setShowMenu: (param: MenuType) => void
}

export const Menu = ({ user, showMenu, setShowMenu }: MenuProps) => {
  const signOut = useSignOut()

  // TODO: tirar trues quando back tiver pronto
  const canShow = {
    reviews: user?.status === 'Client' || true,
    haircuts: user?.status === 'Barber' || user?.status === 'Client' || true,
    calendar: user?.status === 'Barber' || true
  }

  const handleLogout = () => {
    signOut()
    setShowMenu('inactive')
  }

  return (
    <S.Menu showMenu={showMenu} onMouseLeave={() => setShowMenu('inactive')}>
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
      <button onClick={handleLogout} className="row">
        <LogoutOutlined />
        <span>Sair</span>
      </button>
    </S.Menu>
  )
}
