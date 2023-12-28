import { Header } from '../../components'
import { About } from './about/About'
import { Title } from './title/Title'
import { Services } from './services/Services'

export const Home = () => {
  return (
    <>
      <Header />
      <Title />
      <About />
      <Services />
    </>
  )
}
