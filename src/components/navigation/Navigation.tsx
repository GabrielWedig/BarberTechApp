import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../../utils'
import { Button } from '..'

type Tabs = 'home' | 'about' | 'services' | 'feedbacks'
type Paths = '/' | '/feedbacks'

export const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (path: Paths, tabName: Tabs) =>
    location.pathname === path
      ? scrollToSection(tabName)
      : navigate(path, { state: tabName })

  return (
    <nav>
      <Button type="transparent" onClick={() => handleNavigation('/', 'home')}>
        Home
      </Button>
      <Button type="transparent" onClick={() => handleNavigation('/', 'about')}>
        Sobre
      </Button>
      <Button
        type="transparent"
        onClick={() => handleNavigation('/', 'services')}
      >
        Serviços
      </Button>
      <Button type="transparent" onClick={() => scrollToSection('footer')}>
        Contatos
      </Button>
      <Button
        type="transparent"
        onClick={() => handleNavigation('/feedbacks', 'feedbacks')}
      >
        Depoimentos
      </Button>
    </nav>
  )
}
