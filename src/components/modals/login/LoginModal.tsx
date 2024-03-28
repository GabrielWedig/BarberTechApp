import { useState } from 'react'
import { Login, Modal, UserModal, Visible } from '../..'

interface LoginModalProps {
  open: boolean
  onClose: () => void
  type?: ModalTypes
  userId?: string
}

export type ModalTypes =
  | 'login'
  | 'register'
  | 'registerClient'
  | 'edit'

export const LoginModal = ({
  open,
  onClose,
  type = 'login',
  userId
}: LoginModalProps) => {
  const [modalType, setModalType] = useState<ModalTypes>(type)
  
  const registerTypes = ['register', 'registerClient', 'edit']

  return (
    <Modal open={open} onClose={onClose}>
      <Visible when={modalType === 'login'}>
        <Login setModalType={setModalType} onClose={onClose} />
      </Visible>
      <Visible when={registerTypes.some((t) => t === modalType)}>
        <UserModal
          setModalType={setModalType}
          onClose={onClose}
          userId={userId}
          type={modalType}
        />
      </Visible>
    </Modal>
  )
}
