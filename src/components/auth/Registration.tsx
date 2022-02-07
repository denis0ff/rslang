import axios from 'axios'
import validator from 'validator'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { SIGN_IN, USERS } from '../../utils/config'
import { Form } from './Authorization'
import { AuthAction, Errors, IAuthProps } from './types'
import { AuthContext } from '../../utils/services'

export const Registration = ({ setAction, setError }: IAuthProps) => {
  const { setIsAuth } = useContext(AuthContext)
  const [register, setRegister] = useState(() => {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',
    }
  })

  const changeInputRegister = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setRegister((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const submitChackin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validator.isEmail(register.email)) setError(Errors.NO_EMAIL)
    else if (!validator.isStrongPassword(register.password, { minSymbols: 0 }))
      setError(Errors.PASS_STRONG)
    else if (register.password !== register.password2)
      setError(Errors.PASS_REPEAT)
    else
      axios
        .post(USERS, {
          username: register.username,
          email: register.email,
          password: register.password,
        })
        .then(() => {
          axios
            .post(SIGN_IN, {
              email: register.email,
              password: register.password,
            })
            .then(({ data }) => {
              localStorage.setItem('token', data.token)
              localStorage.setItem('refreshToken', data.refreshToken)
              localStorage.setItem('userId', data.userId)
              setIsAuth(true)
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
        })
        .catch(({ response }) => {
          switch (response.status) {
            case 417:
              setError(Errors.ERROR_417)
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
          <legend>Введите данные для регистрации</legend>
          <label htmlFor="username">
            Имя:{' '}
            <input
              type="username"
              id="username"
              name="username"
              value={register.username}
              onChange={(e) => changeInputRegister(e)}
            />
          </label>

          <label htmlFor="email">
            Email:{' '}
            <input
              type="email"
              id="email"
              name="email"
              value={register.email}
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
              value={register.password}
              onChange={(e) => changeInputRegister(e)}
            />
          </label>
          <label htmlFor="password">
            Повторите пароль:{' '}
            <input
              type="password"
              id="password2"
              name="password2"
              value={register.password2}
              onChange={(e) => changeInputRegister(e)}
            />
          </label>
          <input type="submit" />
        </fieldset>
      </Form>
      <p>
        Уже с нами?{' '}
        <button type="button" onClick={() => setAction(AuthAction.AUTH)}>
          Да, войти!
        </button>
      </p>
    </div>
  )
}
