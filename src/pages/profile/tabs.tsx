import { Profile } from './profile/Profile'
import { Calendar } from './calendar/Calendar'
import { Manage } from './manage/Manage'
import { History } from './history/History'

export type TabValues = 'profile' | 'manage' | 'history' | 'calendar'
type TabNames = 'perfil' | 'gerenciar' | 'histórico' | 'calendário'

interface TabsTypeUsers {
  [name: string]: {
    header: Header[]
    element: Element
  }
}

interface Element {
  [name: string]: JSX.Element
}

interface Header {
  name: TabNames
  value: TabValues
}

export const tabs = {
  profile: <Profile />,
  manage: <Manage />,
  calendar: <Calendar />,
  history: <History />
}

export const tabsTypeUsers: TabsTypeUsers = {
  Default: { header: [], element: {} },
  Admin: {
    header: [
      { name: 'perfil', value: 'profile' },
      { name: 'gerenciar', value: 'manage' }
    ],
    element: { profile: tabs.profile, manage: tabs.manage }
  },
  Barber: {
    header: [
      { name: 'perfil', value: 'profile' },
      { name: 'histórico', value: 'history' },
      { name: 'calendário', value: 'calendar' }
    ],
    element: {
      profile: tabs.profile,
      manage: tabs.manage,
      history: tabs.history
    }
  },
  Client: {
    header: [
      { name: 'perfil', value: 'profile' },
      { name: 'histórico', value: 'history' }
    ],
    element: { profile: tabs.profile, history: tabs.history }
  }
}
