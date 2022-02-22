import About from '../components/main/AboutUs'
import Benefits from '../components/main/Benefits'
import Flex from '../components/main/flex'
import GreetingsBlock from '../components/main/greetings'
import Presentatins from '../components/main/presentation'
import { Container } from '../components/ui/elements'
import { Footer } from '../components/ui/Footer/Footer'

export const Main = () => {
  return (
    <>
      <Container>
        <Flex styleRT={{ direction: 'column' }}>
          <GreetingsBlock />
          <Presentatins />
          <Benefits />
          <About />
        </Flex>
      </Container>
      <Footer />
    </>
  )
}
