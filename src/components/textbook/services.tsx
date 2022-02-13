import axios from 'axios'
import { getWordsResponse } from '../../utils/config'
import { Paths } from '../../utils/types'
import {
  getAggregatedWordsURL,
  getNewUserTokenURL,
  getUserAggregatedWordsAllFilter,
  getUserAggregatedWordsDifficultFilter,
} from './config'
import {
  IAggregatedResponse,
  IAggregatedWord,
  WordDifficultyType,
} from './types'

interface ITokens {
  token: string
  refreshToken: string
}

const saveNewToken = (data: ITokens) => {
  localStorage.setItem('token', data.token)
  localStorage.setItem('refreshToken', data.refreshToken)
}

const expireTokens = () => {
  window.location.href = Paths.AUTH
}

const getNewUserToken = (id: string | null, rt: string | null) => {
  return fetch(getNewUserTokenURL(id), {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${rt}`,
      Accept: 'application/json',
    },
  })
}

export const getWordsService = async (group: number, page: number) => {
  const data = await axios.get(getWordsResponse(group, page)).then((res) => {
    return res.data as IAggregatedWord[]
  })
  return data
}

export const getUserAggregatedWordsService = async (
  group: number,
  page: number,
  filter: WordDifficultyType
) => {
  const userId = () => localStorage.getItem('userId') || ''
  const token = () => localStorage.getItem('token') || ''
  const refreshToken = () => localStorage.getItem('refreshToken') || ''

  let difficultyType = ''
  if (filter === 'difficult')
    difficultyType = getUserAggregatedWordsDifficultFilter(group, page)
  else difficultyType = getUserAggregatedWordsAllFilter(group, page)

  const response = (activeToken: string) => {
    return fetch(getAggregatedWordsURL(userId(), difficultyType), {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${activeToken}`,
        Accept: 'application/json',
      },
    })
  }

  const res = await response(token())
    .then((resp) => {
      if (resp.status === 401) {
        return getNewUserToken(userId(), refreshToken())
          .then((resp2: Response) => {
            if (resp2.status === 200) {
              return resp2.json()
            }
            expireTokens()
            return null
          })
          .then((data: ITokens | null) => {
            if (data !== null) {
              saveNewToken(data)
              console.log('refreshToken', data)
              return response(token()).then((resp3) => {
                return resp3.json()
              })
            }
            return null
          })
      }
      if (resp.status === 200) {
        return resp.json()
      }
      return null
    })
    .then((content: IAggregatedResponse[] | null) => {
      if (content !== null) {
        console.log('content ', content)
        return content[0].paginatedResults
      }
      return null
    })
    .catch((error) => {
      console.error(error)
      return null
    })
  return res
}
