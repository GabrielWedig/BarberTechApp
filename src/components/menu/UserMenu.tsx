import { UserData } from '../../hooks'
import * as S from './style'
import { MenuType } from '..'

const urlPhotoUserDefault =
  'https://9jnq7ntowayxhgea.public.blob.vercel-storage.com/default-user-gQxqscw5gJhOM1lWE7Qeph9C9hX0ox'

interface UserMenuProps {
  setShowMenu: (param: MenuType) => void
  user?: UserData
}

export const UserMenu = ({ setShowMenu, user }: UserMenuProps) => {
  return (
    <S.UserMenuBox onMouseEnter={() => setShowMenu('active')}>
      <div className="info">
        <span>Bem vindo!</span>
        <span>{user?.name}</span>
      </div>
      <S.UserPhoto url={user?.photo ?? urlPhotoUserDefault} />
    </S.UserMenuBox>
  )
}
