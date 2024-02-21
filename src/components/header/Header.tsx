import { useEffect, useState } from 'react'
import { Button, LoginModal, Menu, Navigation, UserMenu } from '..'
import { ReactComponent as Logo } from '../../img/logo.svg'
import * as S from './style'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import {
  UserData,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../hooks'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export type MenuType = 'initial' | 'active' | 'inactive'

export const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<MenuType>('initial')
  const [user, setUser] = useState<UserData>()

  const isAuthenticated = useIsAuthenticated()
  const userId = useAuthUser<string>()

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
