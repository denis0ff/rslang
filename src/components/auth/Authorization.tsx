import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext, singInPromise } from '../../utils/services'
import { catchError, signIn } from '../../utils/utils'
import { Button } from '../games/Difficulty'
import { Wrapper } from '../games/Result/Result'
import { GameLink } from '../games/Result/ResultView'
import { AuthAction, Errors, IAuthProps } from './types'
import { Error } from './Error'

export const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 1rem;
  fieldset {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    border: 0;
    gap: 1em;
    font-size: 1.2em;
  }
  legend {
    font-size: 1.5em;
    color: #50ffff;
  }
  label {
    height: 1.4em;
    margin: 0.5em 0;
  }
  span {
    align-self: flex-start;
    padding-bottom: 2em;
  }
`

export const Input = styled.input`
  padding: 0.5em;
  height: 100%;
  width: fit-content;
  font-size: 0.8em;
  font-family: inherit;
  color: #fafafa;
  box-shadow: 0 0 0 30px #030303 inset;
  border: none;
  border-radius: 5px;
  outline: 1px solid #fafafa;
  transition: 300ms;
  &:focus {
    outline-color: wheat;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    font-size: 0.8em;
    font-family: inherit;
    -webkit-text-fill-color: #fafafa;
  }
`

export const LinkPage = styled(GameLink)`
  display: inline-block;
  text-transform: unset;
  font-size: 1.2em;
  border-color: #fafafa;
`

export const Submit = styled(Button)`
  margin-top: 2em;
  align-self: center;
  padding: 0.5em 5em;
`

export const WrapperAuth = styled(Wrapper)`
  height: fit-content;
`

export const Authorization = ({ setAction, setError, error }: IAuthProps) => {
  const { setIsAuth } = useContext(AuthContext)
  const [auth, setAuth] = useState(() => {
    return {
      email: '',
      password: '',
    }
  })

  const changeInputRegister = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setAuth((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  const submitChackin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    singInPromise({ email: auth.email, password: auth.password })
      .then(({ data }) => {
        signIn(data)
        setIsAuth(true)
      })
      .catch(({ response }) => setError(catchError(response.status)))
  }

  return (
    <WrapperAuth>
      <Form onSubmit={(e) => submitChackin(e)}>
        <fieldset>
          <legend>Уже с Нами?</legend>
          <span>Войдите в свой аккаунт RS Lang!</span>
          <label htmlFor="email">
            Email:{' '}
            <Input
              type="email"
              id="email"
              name="email"
              value={auth.email}
              onChange={(e) => changeInputRegister(e)}
              formNoValidate
            />
          </label>
          <label htmlFor="password">
            Пароль:{' '}
            <Input
              type="password"
              id="password"
              name="password"
              value={auth.password}
              onChange={(e) => changeInputRegister(e)}
            />
          </label>
          <Submit type="submit">Войти</Submit>
          <Error error={error} />
        </fieldset>
      </Form>
      <div>
        Еще не с нами? Тогда{' '}
        <LinkPage
          onClick={() => {
            setError(Errors.ALL_RIGHT)
            setAction(AuthAction.REGISTRATION)
          }}
        >
          зарегистрируйся
        </LinkPage>
      </div>
    </WrapperAuth>
  )
}
