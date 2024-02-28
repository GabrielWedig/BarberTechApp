import { Calendar, Manage, History, Edit } from '.'
import { UserData } from '../../hooks'

interface Tabs {
  [name: string]: Tab
}

interface Tab {
  header: Header
  element: JSX.Element
}

interface Header {
  label: string
  value: string
}

export const getTab = (
  activeTab: string,
  isEdit: boolean,
  user?: UserData
) => {
  const tabs: Tabs = {
    profile: {
      header: { label: 'perfil', value: 'profile' },
      element: <Edit isEdit={isEdit} user={user} />
    },
    manage: {
      header: { label: 'gerenciar', value: 'manage' },
      element: <Manage />
    },
    calendar: {
      header: { label: 'calendário', value: 'calendar' },
      element: <Calendar />
    },
    history: {
      header: { label: 'histórico', value: 'history' },
      element: <History user={user} />
    }
  }

  const tabNames = {
    Default: [],
    Admin: ['profile', 'manage'],
    Barber: ['profile', 'history', 'calendar'],
    Client: ['profile', 'history']
  }

  const userTabs = tabNames[user?.type ?? 'Default']

  return {
    header: userTabs.map(tab => tabs[tab].header),
    element: tabs[activeTab].element
  }
}
