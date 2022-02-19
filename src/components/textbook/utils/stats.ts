import axios from 'axios'
import { getTokenConfig, USER_STAT } from '../../../utils/config'
import {
  getAllUserWordsPromise,
  getNewToken,
  getStatPromise,
} from '../../../utils/services'
import { sameDay } from '../../../utils/utils'
import { Errors } from '../../games/types'
import { setLearnedWordsLength } from '../../games/utils'
import { ICreateStatProps, IUpdateStatProps } from './types'

const statTemplate = {
  learnedWords: 0,
  optional: {
    words: '',
    date: new Date().toJSON(),
    games: {
      sprint: { newWords: 0, allWords: 0, right: 0, streak: 0 },
      audioCall: { newWords: 0, allWords: 0, right: 0, streak: 0 },
    },
    longStat: '',
  },
}

const createStatConfig = ({ learnedWords }: ICreateStatProps) => {
  const template = { ...statTemplate }
  template.learnedWords = learnedWords.today
  template.optional.longStat = JSON.stringify([
    {
      date: template.optional.date,
      newWords: 0,
      learnedWords: learnedWords.all,
    },
  ])
  return template
}

const updateStatConfig = ({ data, learnedWords }: IUpdateStatProps) => {
  delete data.id
  data.learnedWords = learnedWords.today
  const parsedLongStat = JSON.parse(data.optional.longStat)
  if (sameDay(data.optional.date))
    parsedLongStat[parsedLongStat.length - 1].learnedWords = learnedWords.all
  else {
    data.optional.date = statTemplate.optional.date
    data.optional.games = { ...statTemplate.optional.games }
    parsedLongStat.push({
      date: statTemplate.optional.date,
      newWords: 0,
      learnedWords: learnedWords.all,
    })
  }
  data.optional.longStat = JSON.stringify(parsedLongStat)
  return data
}

const createStatPromise = async (props: ICreateStatProps) =>
  axios.put(USER_STAT, createStatConfig(props), getTokenConfig())

const updateStatPromise = async (props: IUpdateStatProps) =>
  axios.put(USER_STAT, updateStatConfig(props), getTokenConfig())

const createStat = async (props: ICreateStatProps) =>
  createStatPromise(props).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken()
      createStatPromise(props)
    }
  })

const updateStat = async (props: IUpdateStatProps) => {
  updateStatPromise(props).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken()
      updateStatPromise(props)
    }
  })
}

export const changeStats = async () => {
  const learnedWords = { all: 0, today: 0 }
  await getAllUserWordsPromise()
    .then(({ data }) => setLearnedWordsLength({ learnedWords, data }))
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken()
        getAllUserWordsPromise().then(({ data }) =>
          setLearnedWordsLength({ learnedWords, data })
        )
      }
    })
  getStatPromise()
    .then(({ data }) => updateStat({ data, learnedWords }))
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken()
        getStatPromise()
          .then(({ data }) => updateStat({ data, learnedWords }))
          .catch((error) => {
            if (error.response.status === Errors.ERROR_404)
              createStat({ learnedWords })
          })
      }
      if (response.status === Errors.ERROR_404) createStat({ learnedWords })
    })
}
