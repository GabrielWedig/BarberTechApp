import { List } from '../../../components'
import * as S from './style'

export type ManageTypes =
  | 'users'
  | 'schedules'
  | 'haircuts'
  | 'feedbacks'
  | 'establishments'
  | 'barbers'

export const Manage = () => {
  const types: ManageTypes[] = [
    'users',
    'schedules',
    'haircuts',
    'feedbacks',
    'establishments',
    'barbers'
  ]

  return (
    <S.ManageBox>
      <h2>Portal do Administrador</h2>
      {types.map((type, index) => (
        <List type={type} key={index} />
      ))}
    </S.ManageBox>
  )
}
