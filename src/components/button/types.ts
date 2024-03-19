import { ColorType } from '../../utils'

interface ButtonTypes {
  [name: string]: {
    background: ColorType
    textColor: ColorType
    hoverColor: ColorType | null
    fontWeight: number
    padding: string | null
  }
}

export const buttonTypes: ButtonTypes = {
  primary: {
    background: 'orange',
    textColor: 'black',
    hoverColor: null,
    fontWeight: 400,
    padding: '10px 60px'
  },
  secondary: {
    background: 'orange50',
    textColor: 'orange',
    hoverColor: null,
    fontWeight: 600,
    padding: '0 30px'
  },
  transparent: {
    background: 'transparent',
    textColor: 'white',
    hoverColor: 'orange',
    fontWeight: 300,
    padding: null
  }
}
