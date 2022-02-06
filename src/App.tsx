import { Link, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { AudioCall } from './pages/AudioCall'
import { Auth } from './pages/Auth'
import { Main } from './pages/Main'
import { NotFound } from './pages/NotFound'
import { Sprint } from './pages/Sprint'
import { TextbookPage } from './pages/TextbookPage'
import { Paths } from './utils/types'

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
        <NavLink to={Paths.HOME}>Домой</NavLink>
        <NavLink to={Paths.SPRINT}>Спринт</NavLink>
        <NavLink to={Paths.AUDIO_CALL}>Аудиовызов</NavLink>
        <NavLink to={Paths.TEXTBOOK}>Учебник</NavLink>
        <NavLink to={Paths.AUTH}>Вход</NavLink>
      </Header>
      <Routes>
        <Route path={Paths.HOME} element={<Main />} />
        <Route path={Paths.SPRINT} element={<Sprint />} />
        <Route path={Paths.AUDIO_CALL} element={<AudioCall />} />
        <Route path={Paths.TEXTBOOK} element={<TextbookPage />} />
        <Route path={Paths.AUTH} element={<Auth />} />
        <Route path={Paths.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </>
  )
}
