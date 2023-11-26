import { Button } from '..'

// const logo = require('../../../public/img/logo.svg')

export const Header = () => {
  return (
    <header>
      {/* <img src={logo} alt="logo" /> */}
      <nav>
        <Button>Home</Button>
        <Button>Serviços</Button>
        <Button>Sobre</Button>
        <Button>Contatos</Button>
        <Button>Depoimentos</Button>
      </nav>
      <Button>Login</Button>
    </header>
  )
}
