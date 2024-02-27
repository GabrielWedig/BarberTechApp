import * as S from './style'
import { buttonTypes } from './types'

interface ButtonProps {
  children: React.ReactNode
  type?: ButtonType
  onClick: () => void
}

type ButtonType = 'primary' | 'secondary' | 'transparent'

export const Button = ({
  children,
  type = 'primary',
  onClick
}: ButtonProps) => {
  const button = buttonTypes[type]

  return (
    <S.StyledButton
      background={button.background}
      textcolor={button.textColor}
      hovercolor={button.hoverColor}
      fontWeight={button.fontWeight}
      padding={button.padding}
      onClick={onClick}
      sx={{
        '&:hover': {
          backgroundColor: button.background
        }
      }}
    >
      {children}
    </S.StyledButton>
  )
}
