import axios from 'axios'
import { createContext } from 'react'
import { IRegistration, IsAuthContext, ISignIn } from '../components/auth/types'
import {
  IPostWordProps,
  IPutWordProps,
  IAddWordStatProps,
  IPutStatPromiseProps,
} from '../components/games/types'
import {
  createStatConfig,
  getTokenConfig,
  getUserWordResponse,
  getWordsResponse,
  postWordConfig,
  putWordConfig,
  SIGN_IN,
  updateStatConfig,
  USERS,
  USER_STAT,
  USER_TOKEN,
  USER_WORDS,
} from './config'
import { IGotUserWord, IStat, Paths, Tokens } from './types'
import { getRandomInteger } from './utils'

export const getWordsPromise = async (group: number, page?: number) =>
  page !== undefined
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

export const getNewToken = async () =>
  axios
    .get(USER_TOKEN, getTokenConfig(Tokens.refreshToken))
    .then(({ data }) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('refreshToken', data.refreshToken)
    })
    .catch(() => {
      localStorage.clear()
      window.location.href = Paths.AUTH
    })

export const getWordPromise = async (id: string) =>
  axios.get<IGotUserWord>(getUserWordResponse(id), getTokenConfig())

export const postWordPromise = async ({
  id,
  isRight,
  gameType,
}: IPostWordProps) =>
  axios.post(
    getUserWordResponse(id),
    postWordConfig({ isRight, gameType }),
    getTokenConfig()
  )

export const putWordPromise = async ({
  id,
  isRight,
  gameType,
  data,
}: IPutWordProps) =>
  axios.put(
    getUserWordResponse(id),
    putWordConfig({ data, isRight, gameType }),
    getTokenConfig()
  )

export const getStatPromise = async () =>
  axios.get<IStat>(USER_STAT, getTokenConfig())

export const createStatPromise = async (props: IAddWordStatProps) =>
  axios.put(USER_STAT, createStatConfig(props), getTokenConfig())

export const putStatPromise = async (props: IPutStatPromiseProps) =>
  axios.put(USER_STAT, updateStatConfig(props), getTokenConfig())

export const getAllUserWordsPromise = async () =>
  axios.get<IGotUserWord[]>(USER_WORDS, getTokenConfig())
