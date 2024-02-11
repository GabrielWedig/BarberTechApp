import { Header } from '../../components'
import { About } from './about/About'
import { Title } from './title/Title'
import { Services } from './services/Services'
import { Team } from './team/team'

export const Home = () => {
  return (
    <>
      <Header />
      <Title />
      <About />
      <Services />
      <Team />
    </>
  )
}
