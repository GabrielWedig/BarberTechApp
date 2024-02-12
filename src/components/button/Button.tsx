import * as S from './style'

interface ButtonProps {
  children: React.ReactNode
  type?: ButtonType
  onClick: () => void
}

type ButtonType = 'primary' | 'transparent'

const types = {
  primary: {
    background: 'orange',
    textColor: 'black'
  },
  transparent: {
    background: 'transparent',
    textColor: 'white'
  }
}

export const Button = ({
  children,
  type = 'primary',
  onClick
}: ButtonProps) => {
  return (
    <S.StyledButton
      background={types[type].background}
      textColor={types[type].textColor}
      onClick={onClick}
    >
      {children}
    </S.StyledButton>
  )
}
