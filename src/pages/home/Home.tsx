import { useLocation } from 'react-router-dom'
import { Title, About, Services, Team, Localization } from '.'
import { Footer, Header, Snackbar } from '../../components'
import { useEffect } from 'react'
import { scrollToSection } from '../../utils'

export const Home = () => {
  const location = useLocation()

  useEffect(() => {
    scrollToSection(location.state, false)
  }, [])

  return (
    <>
      <Header />
      <Title />
      <About />
      <Services />
      <Team />
      <Localization />
      <Footer />
      <Snackbar />
    </>
  )
}
