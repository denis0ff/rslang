import validator from 'validator'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Form } from './Authorization'
import { AuthAction, Errors, IAuthProps } from './types'
import {
  AuthContext,
  registerPromise,
  singInPromise,
} from '../../utils/services'
import { catchError, signIn } from '../../utils/utils'

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
      registerPromise({
        username: register.username,
        email: register.email,
        password: register.password,
      })
        .then(() => {
          singInPromise({
            email: register.email,
            password: register.password,
          })
            .then(({ data }) => {
              signIn(data)
              setIsAuth(true)
            })
            .catch(({ response }) => setError(catchError(response.status)))
        })
        .catch(({ response }) => setError(catchError(response.status)))
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
