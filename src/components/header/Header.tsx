import { useState } from 'react'
import { Button, LoginModal } from '..'
import { ReactComponent as Logo } from '../../img/logo.svg'
import { scrollToSection } from '../../utils'
import * as S from './style'

export const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <S.Header>
      <Logo />
      <nav>
        <Button type="transparent" onClick={() => scrollToSection('home')}>
          Home
        </Button>
        <Button type="transparent" onClick={() => scrollToSection('services')}>
          Serviços
        </Button>
        <Button type="transparent" onClick={() => scrollToSection('about')}>
          Sobre
        </Button>
        <Button type="transparent" onClick={() => scrollToSection('footer')}>
          Contatos
        </Button>
        <Button
          type="transparent"
          onClick={() => console.log('navega depoimentos')}
        >
          Depoimentos
        </Button>
      </nav>
      <Button onClick={() => setOpenModal(true)}>Login</Button>
      <LoginModal open={openModal} onClose={() => setOpenModal(false)} />
    </S.Header>
  )
}
