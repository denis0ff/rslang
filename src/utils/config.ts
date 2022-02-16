import {
  GameTypeOption,
  IAddWordStatProps,
  IUpdateStatProps,
} from '../components/games/types'
import { IGotUserWord, Tokens, WordDifficulties } from './types'
import { sameDay } from './utils'

const BASE = 'https://react-rslang-api.herokuapp.com/'

const WORDS = `${BASE}words`

export const USERS = `${BASE}users`
export const SIGN_IN = `${BASE}signin`

export const USER = `${USERS}/${localStorage.getItem('userId')}`
export const USER_TOKEN = `${USER}/tokens`
export const USER_STAT = `${USER}/statistics`

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

const newDayTemplate = {
  date: new Date().toJSON(),
  games: {
    sprint: { newWords: 0, allWords: 0, right: 0, streak: 0 },
    audioCall: { newWords: 0, allWords: 0, right: 0, streak: 0 },
  },
}

export const createStatConfig = ({ answers, gameType }: IAddWordStatProps) => {
  const { right, wrong, max } = answers
  const learnedWords = right.length + wrong.length
  const template = { ...newDayTemplate }
  template.games[gameType].newWords = learnedWords
  template.games[gameType].allWords = learnedWords
  template.games[gameType].right = right.length
  template.games[gameType].streak = max
  return {
    learnedWords,
    optional: {
      words: JSON.stringify([...right, ...wrong].map((w) => w.id)),
      ...template,
      longStat: JSON.stringify([
        {
          date: template.date,
          newWords: learnedWords,
        },
      ]),
    },
  }
}

export const updateStatConfig = ({
  data,
  answers,
  gameType,
}: IUpdateStatProps) => {
  delete data.id
  const { words, games, date, longStat } = data.optional
  const { right, wrong, max } = answers
  const newWords = Array.from(
    new Set([...JSON.parse(words), ...[...right, ...wrong].map((w) => w.id)])
  )
  const newWordsCount = newWords.length - data.learnedWords
  const longStatArray = JSON.parse(longStat)
  if (sameDay(date)) {
    games[gameType].newWords += newWordsCount
    games[gameType].allWords += right.length + wrong.length
    games[gameType].right += right.length
    if (max > games[gameType].streak) games[gameType].streak = max
    longStatArray[longStatArray.length - 1].newWords += newWordsCount
  } else {
    const template = { ...newDayTemplate }
    template.games[gameType].newWords = newWordsCount
    template.games[gameType].allWords = right.length + wrong.length
    template.games[gameType].right = right.length
    template.games[gameType].streak = max
    longStatArray.push({ date: template.date, newWords: newWordsCount })
    data.optional = { ...data.optional, ...template }
  }
  data.learnedWords = newWords.length
  data.optional.words = JSON.stringify(newWords)
  data.optional.longStat = JSON.stringify(longStatArray)
  return data
}
