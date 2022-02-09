import { GameTypeOption } from '../components/games/types'
import { IGotUserWord, Tokens, WordDifficulties } from './types'
import { sameDay } from './utils'

const BASE = 'https://react-rslang-api.herokuapp.com/'
const WORDS = `${BASE}words`

export const USERS = `${BASE}users`
export const USER = `${USERS}/${localStorage.getItem('userId')}`
export const USER_TOKEN = `${USER}/tokens`

export const SIGN_IN = `${BASE}signin`

export const getWordsResponse = (group: number, page: number) =>
  `${WORDS}?group=${group}&page=${page}`

export const getFileResponse = (filepath: string) => `${BASE}${filepath}`

export const getTokenConfig = (type = Tokens.token) => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(type)}`,
    },
  }
}

export const getUserWordResponse = (wordId: string) => `${USER}/words/${wordId}`

const MIN_FOR_STUDIED = 3

export const postWordConfig = ({
  isRight,
  gameType,
}: {
  isRight: boolean
  gameType: GameTypeOption
}) => {
  const gamesTemplate = {
    sprint: { right: 0, wrong: 0 },
    audioCall: { right: 0, wrong: 0 },
  }
  if (isRight) gamesTemplate[gameType].right = 1
  else gamesTemplate[gameType].wrong = 1
  return {
    difficulty: WordDifficulties.STUDIED,
    optional: {
      lastTime: new Date().toJSON(),
      allTry: 1,
      streak: isRight ? 1 : 0,
      games: { ...gamesTemplate },
    },
  }
}

export const putWordConfig = ({
  data,
  isRight,
  gameType,
}: {
  data: IGotUserWord
  isRight: boolean
  gameType: GameTypeOption
}) => {
  delete data.id
  delete data.wordId
  if (isRight) {
    data.optional.streak += 1
    if (data.optional.streak >= MIN_FOR_STUDIED)
      data.difficulty = WordDifficulties.STUDIED
    data.optional.games[gameType].right += 1
  } else {
    data.difficulty = WordDifficulties.DIFFICULT
    data.optional.streak = 0
    data.optional.games[gameType].wrong += 1
  }
  if (sameDay(data.optional.lastTime)) data.optional.allTry += 1
  else {
    data.optional.lastTime = new Date().toJSON()
    data.optional.allTry = 1
  }
  return data
}
