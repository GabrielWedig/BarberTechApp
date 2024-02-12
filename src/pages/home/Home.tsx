import { Title, About, Services, Team, Localization } from '.'
import { Footer, Header } from '../../components'

export const Home = () => {
  return (
    <>
      <Header />
      <Title />
      <About />
      <Services />
      <Team />
      <Localization />
      <Footer />
    </>
  )
}
