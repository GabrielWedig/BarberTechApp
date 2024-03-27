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
import { getTab } from './tabs'
import { ArrowForward } from '@mui/icons-material'

export const Profile = () => {
  const userContext = useAuthUser<UserData>()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('profile')
  const [user, setUser] = useState<UserData | null>(userContext)

  const { getUserById } = useUsers()

  const { showErrorSnackbar } = useSnackbarContext()

  useEffect(() => {
    fecthUser()
  }, [])

  const fecthUser = async () => {
    const { data, error } = await usingTryCatch(
      getUserById(userContext?.id ?? '')
    )

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setUser(data)
  }

  const handleEditClick = () => {
    if (activeTab !== 'profile') {
      setActiveTab('profile')
    }
    setIsEdit((current) => !current)
  }

  const tab = getTab(activeTab, isEdit, user)

  return (
    <>
      <Header />
      <S.Background>
        <S.ProfileContainer>
          <div className="header">
            <S.UserPhoto url={user?.imageSource ?? userImage} />
            <div>
              <h2>{user?.name}</h2>
              <span>{user?.type}</span>
            </div>
            <Button onClick={handleEditClick} type="secondary">
              <span>Editar Perfil</span>
              <ArrowForward />
            </Button>
          </div>
          <div className="content">
            <Tabs
              items={tab.header}
              tab={activeTab}
              onChange={(value: string) => setActiveTab(value)}
            />
            {tab.element}
          </div>
        </S.ProfileContainer>
      </S.Background>
      <Footer />
    </>
  )
}
