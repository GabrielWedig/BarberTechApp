import { useEffect, useState } from 'react'
import { Button, Footer, Header, Tabs } from '../../components'
import * as S from './style'
import {
  UserData,
  useSnackbarContext,
  useUsers,
  usingTryCatch
} from '../../hooks'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import userImage from '../../img/user.png'
import { TabValues, tabsTypeUsers } from './tabs'

export const Profile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [tab, setTab] = useState<TabValues>('profile')
  const [user, setUser] = useState<UserData>()

  const userContext = useAuthUser<UserData>()
  const { getById } = useUsers()

  const { showErrorSnackbar } = useSnackbarContext()

  useEffect(() => {
    fecthUser()
  }, [])

  const fecthUser = async () => {
    const { data, error } = await usingTryCatch(getById(userContext?.id ?? ''))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setUser(data)
  }

  //   const handleEditClick = () => {
  //     //vai pra tab configs se não estiver nela
  //     setIsEdit(true)
  //   }

  const handleTabChange = (value: TabValues) => {
    setTab(value)
  }

  const tabs = tabsTypeUsers[user?.type ?? 'Default']

  return (
    <>
      <Header />
      <S.BackgroundOrange />
      <S.BackgroundWhite />
      <S.ProfileContainer>
        {/* <div className="header">
          <S.UserPhoto url={user?.imageSource ?? userImage} />
          <h2>{user?.name}</h2>
          <Button onClick={handleEditClick} type="secondary">
            Editar Perfil
          </Button>
        </div> */}
        <Tabs items={tabs.header} tab={tab} onChange={handleTabChange} />
        {tabs.element[tab]}
        {/* <S.ProfileContent>
          <h3>Configurações da conta</h3>
        </S.ProfileContent> */}
      </S.ProfileContainer>
      <Footer />
    </>
  )
}
