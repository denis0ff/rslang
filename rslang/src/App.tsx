import { Link, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { AudioCall } from './pages/AudioCall'
import { Main } from './pages/Main'
import { NotFound } from './pages/NotFound'
import { Sprint } from './pages/Sprint'

const NavLink = styled(Link)`
  margin: 0 0.5rem;
  padding: 0.2rem 1rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  outline: 3px solid #b3065c;
`

const Header = styled.header`
  margin-bottom: 0.5rem;
  display: flex;
  height: 100%;
`

export const App = () => {
  return (
    <>
      <Header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/sprint">Sprint</NavLink>
        <NavLink to="/audiocall">AudioCall</NavLink>
      </Header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="sprint" element={<Sprint />} />
        <Route path="audiocall" element={<AudioCall />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
