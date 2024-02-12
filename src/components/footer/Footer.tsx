import * as S from './style'
import { Button } from '..'
import { ReactComponent as Logo } from '../../img/logo.svg'
import { scrollToSection } from '../../utils'
import contentJson from '../../content.json'
import {
  Phone,
  Email,
  Room,
  YouTube,
  Twitter,
  Facebook,
  Instagram
} from '@mui/icons-material'

export const Footer = () => {
  const content = contentJson.footer

  return (
    <S.Footer id='footer'>
      <div className="column">
        <Logo className="logo" />
        <p>{content.description}</p>
        <div className="social-box">
          <button className="social-icon">
            <Instagram />
          </button>
          <button className="social-icon">
            <Facebook />
          </button>
          <button className="social-icon">
            <Twitter />
          </button>
          <button className="social-icon">
            <YouTube />
          </button>
        </div>
      </div>
      <div className="column">
        <h3>{content.fastLinks}</h3>
        <nav>
          <Button type="transparent" onClick={() => scrollToSection('home')}>
            Home
          </Button>
          <Button
            type="transparent"
            onClick={() => scrollToSection('services')}
          >
            Serviços
          </Button>
          <Button type="transparent" onClick={() => scrollToSection('about')}>
            Sobre
          </Button>
          <Button
            type="transparent"
            onClick={() => scrollToSection('footer')}
          >
            Contatos
          </Button>
          <Button
            type="transparent"
            onClick={() => console.log('navega depoimentos')}
          >
            Depoimentos
          </Button>
        </nav>
      </div>
      <div className="column">
        <h3>{content.downloads}</h3>
        <nav>
          <Button
            type="transparent"
            onClick={() => console.log('link google play')}
          >
            Google Play
          </Button>
          <Button
            type="transparent"
            onClick={() => console.log('link play store')}
          >
            App Store
          </Button>
        </nav>
      </div>
      <div className="column">
        <h3>{content.contacts}</h3>
        <div className="contacts-box">
          <div className="contact">
            <Room />
            <span>{content.address}</span>
          </div>
          <div className="contact">
            <Email />
            <span>{content.email}</span>
          </div>
          <div className="contact">
            <Phone />
            <span>{content.phone}</span>
          </div>
        </div>
      </div>
    </S.Footer>
  )
}
