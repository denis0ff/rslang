import axios from 'axios'
import validator from 'validator'
import { ChangeEvent, FormEvent, useState } from 'react'
import { USERS } from '../../utils/config'
import { Form } from './Authorization'
import { AuthAction, IAuthProps } from './types'

export const Registration = ({ setAction }: IAuthProps) => {
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
    if (!validator.isEmail(register.email)) {
      alert('You did not enter email')
    } else if (register.password !== register.password2) {
      alert('Repeated password incorrectly')
    } else if (
      !validator.isStrongPassword(register.password, { minSymbols: 0 })
    ) {
      alert(
        'Password must consist of one lowercase, uppercase letter and number, at least 8 characters'
      )
    } else {
      axios
        .post(USERS, {
          username: register.username,
          email: register.email,
          password: register.password,
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
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
