import * as S from './style'

interface ContainerProps {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return <S.Container>{children}</S.Container>
}
