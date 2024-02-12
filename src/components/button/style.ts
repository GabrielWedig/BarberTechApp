import { Button, styled } from '@mui/material'

interface ButtonProps {
  background: string
  textColor: string
  hoverColor: string | null,
  fontWeight: number,
  padding: string | null
}

export const StyledButton = styled(Button)<ButtonProps>((props) => ({
  backgroundColor: getColor(props.background),
  color: getColor(props.textColor),
  fontWeight: props.fontWeight,
  padding: props.padding ?? 10,
  fontFamily: 'Poppins',
  fontSize: '17px',
  textTransform: 'none',
  transition: 'background-color color 0.5s ease',
  borderRadius: '10px',

  '&:hover': {
    color: getColor(props.hoverColor ?? props.textColor),
  }
}))

const getColor = (color: string) => {
  return `var(--${color})`
}
