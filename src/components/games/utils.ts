import {
  createStatPromise,
  getAllUserWordsPromise,
  getNewToken,
  getStatPromise,
  getWordPromise,
  postWordPromise,
  putStatPromise,
  putWordPromise,
} from '../../utils/services'
import { IGotUserWord, WordDifficulties } from '../../utils/types'
import { sameDay } from '../../utils/utils'
import {
  Errors,
  IAddWordStatProps,
  IPostWordProps,
  IPutWordProps,
  IUpdateStatProps,
} from './types'

const createWord = async (props: IPostWordProps) =>
  postWordPromise(props).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken()
      postWordPromise(props)
    }
  })

const updateWord = async (props: IPutWordProps) =>
  putWordPromise(props).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken()
      putWordPromise(props)
    }
  })

export const addWord = async (props: IPostWordProps) =>
  getWordPromise(props.id)
    .then(({ data }) => updateWord({ data, ...props }))
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken()
        getWordPromise(props.id)
          .then(({ data }) => updateWord({ data, ...props }))
          .catch((error) => {
            if (error.response.status === Errors.ERROR_404) createWord(props)
          })
      }
      if (response.status === Errors.ERROR_404) createWord(props)
    })

const createStat = async (props: IAddWordStatProps) =>
  createStatPromise(props).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken()
      createStatPromise(props)
    }
  })

const setLearnedWordsLength = ({
  learnedWords,
  data,
}: {
  learnedWords: { all: number; today: number }
  data: IGotUserWord[]
}) => {
  data.forEach((w) => {
    if (w.difficulty === WordDifficulties.STUDIED) {
      learnedWords.all += 1
      if (sameDay(w.optional.lastTime)) learnedWords.today += 1
    }
  })
}

const updateStat = async (props: IUpdateStatProps) => {
  const learnedWords = { all: 0, today: 0 }
  getAllUserWordsPromise()
    .then(({ data }) => setLearnedWordsLength({ learnedWords, data }))
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken()
        getAllUserWordsPromise().then(({ data }) =>
          setLearnedWordsLength({ learnedWords, data })
        )
      }
    })
  const data = { ...props, learnedWords }
  putStatPromise(data).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken()
      putStatPromise(data)
    }
  })
}

export const addWordStat = async (props: IAddWordStatProps) => {
  getStatPromise()
    .then(({ data }) => updateStat({ data, ...props }))
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken()
        getStatPromise()
          .then(({ data }) => updateStat({ data, ...props }))
          .catch((error) => {
            if (error.response.status === Errors.ERROR_404) createStat(props)
          })
      }
      if (response.status === Errors.ERROR_404) createStat(props)
    })
}
