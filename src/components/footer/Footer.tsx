import { Button } from '..'
import { ReactComponent as Logo } from '../../img/logo.svg'
import * as S from './style'
import contentJson from '../../content.json'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import YoutubeIcon from '@mui/icons-material/YouTube'
import RoomIcon from '@mui/icons-material/Room'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

export const Footer = () => {
  const content = contentJson.footer

  return (
    <S.Footer>
      <div className="column">
        <Logo className="logo"/>
        <p>{content.description}</p>
        <div className="social-box">
          <button className="social-icon">
            <InstagramIcon />
          </button>
          <button className="social-icon">
            <FacebookIcon />
          </button>
          <button className="social-icon">
            <TwitterIcon />
          </button>
          <button className="social-icon">
            <YoutubeIcon />
          </button>
        </div>
      </div>
      <div className="column">
        <h3>{content.fastLinks}</h3>
        <nav>
          <Button type="transparent" onClick={() => console.log()}>
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
      </div>
      <div className="column">
        <h3>{content.downloads}</h3>
        <nav>
          <Button type="transparent" onClick={() => console.log()}>
            Google Play
          </Button>
          <Button type="transparent" onClick={() => console.log()}>
            App Store
          </Button>
        </nav>
      </div>
      <div className="column">
        <h3>{content.contacts}</h3>
        <div className="contacts-box">
          <div className="contact">
            <RoomIcon />
            <span>{content.address}</span>
          </div>
          <div className="contact">
            <EmailIcon />
            <span>{content.email}</span>
          </div>
          <div className="contact">
            <PhoneIcon />
            <span>{content.phone}</span>
          </div>
        </div>
      </div>
    </S.Footer>
  )
}
