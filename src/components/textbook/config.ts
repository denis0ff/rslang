import { BASE } from '../../utils/config'

export const getAggregatedWordsURL = (id: string, filter: string) =>
  `${BASE}users/${id}/aggregatedWords?filter=${filter}`

export const getNewUserTokenURL = (id: string | null) =>
  `${BASE}users/${id}/tokens`

export const getUserAggregatedWordsAllFilter = (
  group: number,
  page: number
) => `
  {"$and":[{ "page": ${page}},{ "group": ${group}},{"$or":[{"userWord.difficulty":"difficult"},{"userWord.difficulty":"studied"}]}]}
`
export const getUserAggregatedWordsDifficultFilter = (
  group: number,
  page: number
) => `
  {"$and":[{ "page": ${page}},{ "group": ${group}},{"userWord.difficulty":"difficult"}]}
`
