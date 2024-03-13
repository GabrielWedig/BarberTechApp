import { Button, styled } from '@mui/material'
import { ColorType, getColor } from '../../utils'

interface ButtonProps {
  background: ColorType
  textcolor: ColorType
  hovercolor: ColorType | null
  fontWeight: number
  padding: string | null
}

export const StyledButton = styled(Button)<ButtonProps>((props) => ({
  backgroundColor: getColor(props.background),
  color: getColor(props.textcolor),
  fontWeight: props.fontWeight,
  padding: props.padding ?? 10,
  fontFamily: 'Poppins',
  fontSize: '17px',
  textTransform: 'none',
  transition: 'background-color color 0.5s ease',
  borderRadius: '10px',

  '&:hover': {
    color: getColor(props.hovercolor ?? props.textcolor)
  }
}))
