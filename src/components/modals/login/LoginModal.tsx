import { useState } from 'react'
import { Login, Modal, Register } from '../..'

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export type ModalTypes = 'login' | 'register' | 'forgot'

export const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const [modalType, setModalType] = useState<ModalTypes>('login')

  return (
    <Modal open={open} onClose={onClose}>
      {modalType === 'login' && <Login setModalType={setModalType} />}
      {modalType === 'register' && <Register setModalType={setModalType} />}
    </Modal>
  )
}
