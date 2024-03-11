import { Button } from '../..'
import { Modal } from '../base/Modal'
import * as S from './style'

interface ConfirmationModalProps {
  open: boolean
  onClose: () => void
  setConfirm: (value: boolean) => void
}

export const ConfirmationModal = ({
  open,
  onClose,
  setConfirm
}: ConfirmationModalProps) => {
  const handleClick = (value: boolean) => {
    setConfirm(value)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <S.ConfirmationBox>
        <h3>Você tem certeza?</h3>
        <Button onClick={() => handleClick(true)} type="primary">
          Sim
        </Button>
        <Button onClick={() => handleClick(false)} type="primary">
          Não
        </Button>
      </S.ConfirmationBox>
    </Modal>
  )
}
