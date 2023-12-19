import {
  PrimaryButton,
  TransparentButton,
  TransparentActiveButton
} from './styles'

interface ButtonProps {
  children: React.ReactNode
  type?: ButtonType
  onClick: () => void
}

type ButtonType = 'primary' | 'transparent' | 'transparent-active'

//TODO: arrumar comportamento do hover / melhorar
const getButtonByType = (type: ButtonType) => {
  switch (type) {
    case 'primary':
      return PrimaryButton
    case 'transparent':
      return TransparentButton
    case 'transparent-active':
      return TransparentActiveButton
    default:
      return PrimaryButton
  }
}

export const Button = ({
  type = 'primary',
  children,
  onClick
}: ButtonProps) => {
  const StyledButton = getButtonByType(type)
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}
