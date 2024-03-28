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
import { useNavigate } from 'react-router-dom'

interface MenuProps {
  user: UserData | null
  showMenu: MenuType
  setShowMenu: (param: MenuType) => void
}

export const Menu = ({ user, showMenu, setShowMenu }: MenuProps) => {
  const signOut = useSignOut()
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut()
    setShowMenu('inactive')
    navigate('/')
  }

  const handleProfile = () => {
    navigate(`/profile/${user?.id}`)
    setShowMenu('inactive')
  }

  return (
    <S.Menu $showMenu={showMenu} onMouseLeave={() => setShowMenu('inactive')}>
      <button onClick={handleProfile} className="row">
        <PersonOutlined />
        <span>Perfil</span>
      </button>
      <button onClick={handleLogout} className="row">
        <LogoutOutlined />
        <span>Sair</span>
      </button>
    </S.Menu>
  )
}
