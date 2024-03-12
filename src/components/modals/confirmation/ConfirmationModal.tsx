import { Button } from '../..'
import { Modal } from '../base/Modal'
import * as S from './style'

interface ConfirmationModalProps {
  open: boolean
  onClose: () => void
  handleConfirm: (value: boolean) => void
}

export const ConfirmationModal = ({
  open,
  onClose,
  handleConfirm
}: ConfirmationModalProps) => {
  const handleClick = (value: boolean) => {
    handleConfirm(value)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <S.ConfirmationBox>
        <h3>Você tem certeza?</h3>
        <div className="buttons">
          <Button onClick={() => handleClick(true)} type="primary">
            Sim
          </Button>
          <Button onClick={() => handleClick(false)} type="primary">
            Não
          </Button>
        </div>
      </S.ConfirmationBox>
    </Modal>
  )
}
