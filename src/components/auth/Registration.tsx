import validator from 'validator'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Form, Input, LinkPage, Submit, WrapperAuth } from './Authorization'
import { AuthAction, Errors, IAuthProps } from './types'
import {
  AuthContext,
  registerPromise,
  singInPromise,
} from '../../utils/services'
import { catchError, signIn } from '../../utils/utils'
import { Error } from './Error'

export const Registration = ({ setAction, setError, error }: IAuthProps) => {
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
    <WrapperAuth>
      <Form onSubmit={(e) => submitChackin(e)} autoComplete="off">
        <fieldset>
          <legend>Зарегистрируйся в RS Lang</legend>
          <span>и изучай английский используя все возможности приложения</span>
          <label htmlFor="username">
            Имя:{' '}
            <Input
              type="username"
              id="username"
              name="username"
              value={register.username}
              autoComplete="off"
              onChange={(e) => changeInputRegister(e)}
            />
          </label>

          <label htmlFor="email">
            Email:{' '}
            <Input
              type="email"
              id="email"
              name="email"
              value={register.email}
              autoComplete="off"
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
              value={register.password}
              autoComplete="new-password"
              onChange={(e) => changeInputRegister(e)}
            />
          </label>
          <label htmlFor="password2">
            Повторите пароль:{' '}
            <Input
              type="password"
              id="password2"
              name="password2"
              value={register.password2}
              autoComplete="new-password"
              onChange={(e) => changeInputRegister(e)}
            />
          </label>
          <Submit type="submit">Отправить</Submit>
          <Error error={error} />
        </fieldset>
      </Form>
      <p>
        Уже с нами?{' '}
        <LinkPage
          onClick={() => {
            setError(Errors.ALL_RIGHT)
            setAction(AuthAction.AUTH)
          }}
        >
          Да, войти!
        </LinkPage>
      </p>
    </WrapperAuth>
  )
}
