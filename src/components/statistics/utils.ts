import { Dispatch } from 'react'
import { getStatPromise, getNewToken } from '../../utils/services'
import { IStat } from '../../utils/types'
import { Errors } from '../games/types'

export const getStats = async (
  setStats: Dispatch<React.SetStateAction<IStat>>
) => {
  getStatPromise()
    .then(({ data }) => {
      delete data.id
      setStats((prev) => ({ ...prev, ...data }))
    })
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken()
        getStatPromise().then(({ data }) => {
          delete data.id
          setStats((prev) => ({ ...prev, ...data }))
        })
      }
    })
}
