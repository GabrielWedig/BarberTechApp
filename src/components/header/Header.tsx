import { Button } from '..'
import { ReactComponent as Logo } from '../../img/logo.svg'
import * as S from './style'

export const Header = () => {
  return (
    <S.Header>
      <Logo />
      <nav>
        <Button type="transparent-active" onClick={() => console.log()}>
          Home
        </Button>
        <Button type="transparent" onClick={() => console.log()}>
          Serviços
        </Button>
        <Button type="transparent" onClick={() => console.log()}>
          Sobre
        </Button>
        <Button type="transparent" onClick={() => console.log()}>
          Contatos
        </Button>
        <Button type="transparent" onClick={() => console.log()}>
          Depoimentos
        </Button>
      </nav>
      <Button onClick={() => console.log()}>Login</Button>
    </S.Header>
  )
}
