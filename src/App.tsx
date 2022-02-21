import { useMemo, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Burger from './components/nav/Burger'
import { AudioCall } from './pages/AudioCall'
import { Auth } from './pages/Auth'
import { Main } from './pages/Main'
import { NotFound } from './pages/NotFound'
import { Sprint } from './pages/Sprint'
import { Statistics } from './pages/Statistics'
import { TextbookPage } from './pages/TextbookPage'
import { AuthContext } from './utils/services'
import { Paths } from './utils/types'

export const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: #030303;
  overflow-x: hidden;
`

const Header = styled.header`
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  a {
    margin: 1rem 1rem;
    padding: 0.2rem 1rem;
    font-size: 1.2rem;
    border-radius: 0.5rem;
    outline: 3px solid #b3065c;
  }
  .active {
    color: #b3065c;
    border: 3px solid #fff;
    outline: none;
  }
`
const Logout = styled.button`
  width: 50%;
  margin: 1rem 1rem;
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
  text-align: left;
  color: #ffffff;
  background: transparent;
  outline: 3px solid #b3065c;
  border: none;
  font-size: 1.2rem;
`

export const App = () => {
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem('token'))
  const memoizedAuth = useMemo(() => ({ isAuth, setIsAuth }), [isAuth])
  return (
    <AuthContext.Provider value={memoizedAuth}>
      <Header>
        <Burger>
          <NavLink to={Paths.HOME}>Домой</NavLink>
          <NavLink to={Paths.SPRINT}>Спринт</NavLink>
          <NavLink to={Paths.AUDIO_CALL}>Аудиовызов</NavLink>
          <NavLink to={Paths.TEXTBOOK}>Учебник</NavLink>
          {isAuth ? (
            <>
              <NavLink to={Paths.STAT}>Статистика</NavLink>
              <Logout
                onClick={() => {
                  localStorage.clear()
                  setIsAuth(false)
                }}
              >
                Выход
              </Logout>
            </>
          ) : (
            <NavLink to={Paths.AUTH}>Вход</NavLink>
          )}
        </Burger>
      </Header>
      <Routes>
        <Route path={Paths.HOME} element={<Main />} />
        <Route path={Paths.SPRINT} element={<Sprint />} />
        <Route path={Paths.AUDIO_CALL} element={<AudioCall />} />
        <Route path={Paths.TEXTBOOK} element={<TextbookPage />} />
        <Route path={Paths.AUTH} element={<Auth />} />
        <Route path={Paths.STAT} element={<Statistics />} />
        <Route path={Paths.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  )
}
