import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import styled from 'styled-components'
import { SIGN_IN } from '../../utils/config'
import { AuthAction, Errors, IAuthProps } from './types'

export const Form = styled.form`
  margin: 2em;
  & > fieldset {
    width: min-content;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
`

export const Authorization = ({ setAction, setError }: IAuthProps) => {
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
    axios
      .post(SIGN_IN, {
        email: auth.email,
        password: auth.password,
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('userId', data.userId)
        window.location.href = window.location.origin
      })
      .catch(({ response }) => {
        switch (response.status) {
          case 404:
            setError(Errors.ERROR_404)
            break
          case 403:
            setError(Errors.ERROR_403)
            break
          default:
            setError(Errors.ERROR_SOME)
        }
      })
  }

  return (
    <div>
      <Form onSubmit={(e) => submitChackin(e)}>
        <fieldset>
          <legend>Введите данные для входа</legend>
          <label htmlFor="email">
            Email:{' '}
            <input
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
            <input
              type="password"
              id="password"
              name="password"
              value={auth.password}
              onChange={(e) => changeInputRegister(e)}
            />
          </label>
          <input type="submit" />
        </fieldset>
      </Form>
      <p>
        Еще не с нами? Тогда{' '}
        <button
          type="button"
          onClick={() => setAction(AuthAction.REGISTRATION)}
        >
          зарегистрируйся
        </button>
      </p>
    </div>
  )
}
