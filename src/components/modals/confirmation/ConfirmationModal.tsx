import { Button } from '../..'
import { Modal } from '../base/Modal'
import * as S from './style'

interface ConfirmationModalProps {
  open: boolean
  onClose: () => void
  handleConfirm: () => void
}

export const ConfirmationModal = ({
  open,
  onClose,
  handleConfirm
}: ConfirmationModalProps) => {
  const handleClickYes = () => {
    handleConfirm()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <S.ConfirmationBox>
        <h3>Você tem certeza?</h3>
        <div className="buttons">
          <Button onClick={handleClickYes} type="primary">
            Sim
          </Button>
          <Button onClick={onClose} type="primary">
            Não
          </Button>
        </div>
      </S.ConfirmationBox>
    </Modal>
  )
}
