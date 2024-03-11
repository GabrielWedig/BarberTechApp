import { useState } from 'react'
import { Login, Modal, UserModal } from '../..'

interface LoginModalProps {
  open: boolean
  onClose: () => void
  type?: ModalTypes
  userId?: string
}

export type ModalTypes = 'login' | 'register' | 'forgot'

export const LoginModal = ({
  open,
  onClose,
  type,
  userId
}: LoginModalProps) => {
  const [modalType, setModalType] = useState<ModalTypes>(type ?? 'login')

  return (
    <Modal open={open} onClose={onClose}>
      {modalType === 'login' && (
        <Login setModalType={setModalType} onClose={onClose} />
      )}
      {modalType === 'register' && (
        <UserModal
          setModalType={setModalType}
          onClose={onClose}
          userId={userId}
        />
      )}
    </Modal>
  )
}
