import axios from 'axios'
import { createContext, useContext } from 'react'
import { IsAuthContext } from '../components/auth/types'
import { getWordsResponse } from './config'
import { getRandomInteger } from './utils'

export const getWordsPromise = async (group: number, page?: number) =>
  page
    ? axios.get(getWordsResponse(group, page))
    : axios.get(getWordsResponse(group, getRandomInteger(0, 30)))

export const AuthContext = createContext<IsAuthContext>({
  isAuth: false,
  setIsAuth: () => {},
})
