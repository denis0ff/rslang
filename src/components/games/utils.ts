import {
  getNewToken,
  getWordPromise,
  postWordPromise,
  putWordPromise,
} from '../../utils/services'
import { Errors, IPostWordProps, IPutWordProps } from './types'

const createWord = async ({ isRight, id, gameType }: IPostWordProps) =>
  postWordPromise({ id, isRight, gameType }).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken()
      postWordPromise({ id, isRight, gameType })
    }
  })

const updateWord = async ({ data, isRight, id, gameType }: IPutWordProps) =>
  putWordPromise({ data, isRight, id, gameType }).catch(
    async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken()
        putWordPromise({ data, isRight, id, gameType })
      }
    }
  )

export const addWord = async ({ isRight, id, gameType }: IPostWordProps) =>
  getWordPromise(id)
    .then(({ data }) => updateWord({ data, isRight, id, gameType }))
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken()
        getWordPromise(id)
          .then(({ data }) => updateWord({ data, isRight, id, gameType }))
          .catch((error) => {
            if (error.response.status === Errors.ERROR_404)
              createWord({ isRight, id, gameType })
          })
      }
      if (response.status === Errors.ERROR_404)
        createWord({ isRight, id, gameType })
    })
