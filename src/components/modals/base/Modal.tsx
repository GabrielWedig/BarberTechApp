import { Modal as MuiModal, Box } from '@mui/material'
import { Close } from '@mui/icons-material'
import { boxSx, closeSx, modalSx } from './style'

interface ModalProps {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export const Modal = ({ children, open, onClose }: ModalProps) => {
  return (
    <MuiModal sx={modalSx} open={open} onClose={onClose} disableScrollLock>
      <Box sx={boxSx}>
        {children}
        <Close sx={closeSx} fontSize="large" onClick={onClose} />
      </Box>
    </MuiModal>
  )
}
