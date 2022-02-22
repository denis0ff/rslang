import { Dispatch } from 'react'
import { getStatPromise, getNewToken } from '../../utils/services'
import { IStat } from '../../utils/types'
import { sameDay } from '../../utils/utils'
import { Errors } from '../games/types'

export const getStats = async (
  setStats: Dispatch<React.SetStateAction<IStat>>
) => {
  getStatPromise()
    .then(({ data }) => {
      delete data.id
      if (sameDay(data.optional.date))
        setStats((prev) => ({ ...prev, ...data }))
      else
        setStats((prev) => {
          prev.optional.longStat = data.optional.longStat
          return { ...prev }
        })
    })
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken()
        getStatPromise().then(({ data }) => {
          delete data.id
          if (sameDay(data.optional.date))
            setStats((prev) => ({ ...prev, ...data }))
          else
            setStats((prev) => {
              prev.optional.longStat = data.optional.longStat
              return { ...prev }
            })
        })
      }
    })
}
