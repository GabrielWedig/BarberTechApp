import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../../utils'
import { Button } from '..'

export const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'

  const handleClickHome = (path: string) =>
    isHome ? scrollToSection(path) : navigate('/', { state: path })

  const handleClickFeedbacks = (path: string) =>
    isHome ? navigate('/feedbacks', { state: path }) : scrollToSection(path)

  return (
    <nav>
      <Button type="transparent" onClick={() => handleClickHome('home')}>
        Home
      </Button>
      <Button type="transparent" onClick={() => handleClickHome('about')}>
        Sobre
      </Button>
      <Button type="transparent" onClick={() => handleClickHome('services')}>
        Serviços
      </Button>
      <Button type="transparent" onClick={() => scrollToSection('footer')}>
        Contatos
      </Button>
      <Button
        type="transparent"
        onClick={() => handleClickFeedbacks('feedbacks')}
      >
        Depoimentos
      </Button>
    </nav>
  )
}
