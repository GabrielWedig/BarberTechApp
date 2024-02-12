import { Button, styled } from '@mui/material'

interface ButtonProps {
  background: string
  textColor: string
}

export const StyledButton = styled(Button)<ButtonProps>`
  font-family: 'Poppins';
  font-size: '16px';
  font-weight: '300';
  text-transform: 'none';
  background-color: ${(props) => getColor(props.background)};
  color: ${(props) => getColor(props.textColor)};
`

const getColor = (color: string) => {
  return `var(--${color})`
}
