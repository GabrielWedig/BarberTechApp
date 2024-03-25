import { UserData } from '../../../hooks'

interface HistoryProps {
  user?: UserData | null
}

export const History = ({ user }: HistoryProps) => {
  return <p>History</p>
}
