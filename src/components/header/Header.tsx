import { useState } from 'react'
import { Button, LoginModal, Menu, Navigation, UserMenu } from '..'
import { ReactComponent as Logo } from '../../img/logo.svg'
import * as S from './style'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { UserData } from '../../hooks'

export type MenuType = 'initial' | 'active' | 'inactive'

export const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<MenuType>('initial')

  const isAuthenticated = useIsAuthenticated()
  const user = useAuthUser<UserData>()

  return (
    <>
      <S.Header>
        <Logo />
        <Navigation />
        {isAuthenticated() ? (
          <UserMenu setShowMenu={setShowMenu} user={user} />
        ) : (
          <Button onClick={() => setOpenModal(true)}>Login</Button>
        )}
      </S.Header>
      <Menu setShowMenu={setShowMenu} showMenu={showMenu} user={user} />
      <LoginModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  )
}
