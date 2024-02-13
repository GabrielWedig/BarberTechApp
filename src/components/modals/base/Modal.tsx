import { Modal as MuiModal, Box } from '@mui/material'
import { Close } from '@mui/icons-material'

interface ModalProps {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export const Modal = ({ children, open, onClose }: ModalProps) => {
  return (
    <MuiModal
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: '30%',
          padding: '50px 80px',
          height: 'auto',
          backgroundColor: 'var(--blue)',
          borderRadius: '20px',
          position: 'relative',
          filter: 'var(--dropShadow)'
        }}
      >
        {children}
        <Close
          sx={{
            color: 'var(--white)',
            position: 'absolute',
            right: '15px',
            top: '15px',
            cursor: 'pointer'
          }}
          fontSize="large"
          onClick={onClose}
        />
      </Box>
    </MuiModal>
  )
}
