import { UserData } from '../../hooks'
import * as S from './style'
import { MenuType } from '..'
import userImage from '../../img/user.png'

interface UserMenuProps {
  setShowMenu: (param: MenuType) => void
  user: UserData | null
}

export const UserMenu = ({ setShowMenu, user }: UserMenuProps) => {
  return (
    <S.UserMenuBox onMouseEnter={() => setShowMenu('active')}>
      <div className="info">
        <span>Bem vindo!</span>
        <span>{user?.name}</span>
      </div>
      <S.UserPhoto url={user?.photo ?? userImage} />
    </S.UserMenuBox>
  )
}
