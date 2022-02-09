import axios from 'axios'
import { createContext } from 'react'
import { IRegistration, IsAuthContext, ISignIn } from '../components/auth/types'
import { getWordsResponse, SIGN_IN, USERS } from './config'
import { getRandomInteger } from './utils'

export const getWordsPromise = async (group: number, page?: number) =>
  page
    ? axios.get(getWordsResponse(group, page))
    : axios.get(getWordsResponse(group, getRandomInteger(0, 30)))

export const AuthContext = createContext<IsAuthContext>({
  isAuth: false,
  setIsAuth: () => {},
})

export const singInPromise = async ({ email, password }: ISignIn) =>
  axios.post(SIGN_IN, { email, password })

export const registerPromise = async ({
  username,
  email,
  password,
}: IRegistration) =>
  axios.post(USERS, {
    username,
    email,
    password,
  })
