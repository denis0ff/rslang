import styled from 'styled-components'
import About from '../components/main/AboutUs'
import Benefits from '../components/main/Benefits'
import GreetingsBlock from '../components/main/greetings'
import Presentatins from '../components/main/presentation'

const Title = styled.h2``

export const Main = () => {
  return (
    <>
      <GreetingsBlock />
      <Presentatins />
      <Benefits />
      <About />
    </>
  )
}
