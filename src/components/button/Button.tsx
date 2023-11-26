import { Button as MuiButton } from '@mui/material'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return <MuiButton onClick={onClick}>{children}</MuiButton>
}
