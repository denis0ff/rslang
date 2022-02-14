import axios from 'axios'
import { getWordsResponse } from '../../utils/config'
import { Paths } from '../../utils/types'
import {
  getNewUserTokenURL,
  getUserWordURL,
  getUserAggregatedAllWordsURL,
  getUserAggregatedDifficultWordsURL,
} from './textbookConfig'
import {
  IAggregatedResponse,
  IAggregatedWord,
  WordDifficultyType,
} from './textbookTypes'

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

const userId = () => localStorage.getItem('userId') || ''
const token = () => localStorage.getItem('token') || ''
const refreshToken = () => localStorage.getItem('refreshToken') || ''

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

const handlerTokens = async () => {
  return getNewUserToken(userId(), refreshToken()).then((resp2: Response) => {
    if (resp2.status === 200) {
      return resp2.json()
    }
    expireTokens()
    return null
  })
}

export const getWordsService = async (group: number, page: number) => {
  const data = await axios.get(getWordsResponse(group, page)).then((res) => {
    return res.data as IAggregatedWord[]
  })
  return data
}

export const getUserAggregatedWordsService = async (
  filter: WordDifficultyType,
  group?: number,
  page?: number
) => {
  let url = ''
  if (filter === 'difficult') url = getUserAggregatedDifficultWordsURL(userId())
  else url = getUserAggregatedAllWordsURL(userId(), group || 0, page || 0)

  const response = (activeToken: string) => {
    return fetch(url, {
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
        return handlerTokens().then((data: ITokens | null) => {
          if (data !== null) {
            saveNewToken(data)
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
        return content[0]
      }
      return null
    })
    .catch((error) => {
      console.error(error)
      return null
    })
  return res
}

export const addUserDifficultWordService = async (
  word: IAggregatedWord,
  isNew: boolean,
  diff: WordDifficultyType
) => {
  const opt =
    word.userWord && word.userWord.optional ? word.userWord.optional : {}
  const response = (activeToken: string) => {
    return fetch(getUserWordURL(userId(), word.id), {
      method: isNew ? 'PUT' : 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${activeToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty: diff, optional: opt }),
    })
  }
  const res = await response(token())
    .then((resp) => {
      if (resp.status === 401) {
        return handlerTokens().then((data: ITokens | null) => {
          if (data !== null) {
            saveNewToken(data)
            return response(token()).then((resp3) => {
              return resp3.status === 200
            })
          }
          return false
        })
      }
      return resp.status === 200
    })
    .catch((error) => {
      console.error(error)
      return false
    })
  return res
}

export const deleteUserDifficultWordService = async (id: string) => {
  const response = (activeToken: string) => {
    return fetch(getUserWordURL(userId(), id), {
      method: 'DELETE',
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
        return handlerTokens().then((data: ITokens | null) => {
          if (data !== null) {
            saveNewToken(data)
            return response(token()).then((resp3) => {
              return resp3.status === 200
            })
          }
          return false
        })
      }
      return resp.status === 204
    })
    .catch((error) => {
      console.error(error)
      return false
    })
  return res
}