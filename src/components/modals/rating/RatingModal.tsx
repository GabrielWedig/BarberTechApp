import { useState } from 'react'
import { Modal } from '../base/Modal'
import { RatingStars } from './RatingStars'
import { RatingComment } from './RatingComment'

interface RatingModalProps {
  open: boolean
  onClose: () => void
  eventScheduleId: string
}

export interface RatingStarsData {
  establishment: number | null
  barber: number | null
  haircut: number | null
}

export type RatingStarsTypes = 'establishment' | 'barber' | 'haircut'

export type RatingModalTypes =
  | 'establishment'
  | 'barber'
  | 'haircut'
  | 'comment'

export const RatingModal = ({
  eventScheduleId,
  open,
  onClose
}: RatingModalProps) => {
  const defaultData = {
    establishment: 0,
    barber: 0,
    haircut: 0
  }
  const [data, setData] = useState<RatingStarsData>(defaultData)
  const [type, setType] = useState<RatingModalTypes>('establishment')

  return (
    <Modal open={open} onClose={onClose}>
      {type === 'establishment' && (
        <RatingStars
          title="Estabelecimento"
          text="O que você achou do estabelecimento?"
          setType={setType}
          setData={setData}
          next="barber"
          type={type}
          data={data}
        />
      )}
      {type === 'barber' && (
        <RatingStars
          title="Barbeiro"
          text="O que você achou do barbeiro?"
          setType={setType}
          setData={setData}
          next="haircut"
          type={type}
          data={data}
        />
      )}
      {type === 'haircut' && (
        <RatingStars
          title="Corte"
          text="O que você achou do corte?"
          setType={setType}
          setData={setData}
          next="comment"
          type={type}
          data={data}
        />
      )}
      {type === 'comment' && (
        <RatingComment
          setType={setType}
          setData={setData}
          data={data}
          onClose={onClose}
          eventScheduleId={eventScheduleId}
        />
      )}
    </Modal>
  )
}
