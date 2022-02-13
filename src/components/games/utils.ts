import {
  createStatPromise,
  getNewToken,
  getStatPromise,
  getWordPromise,
  postWordPromise,
  putStatPromise,
  putWordPromise,
} from '../../utils/services'
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

const updateStat = async (props: IUpdateStatProps) =>
  putStatPromise(props).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken()
      putStatPromise(props)
    }
  })

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
