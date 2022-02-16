import { ISectionData } from './textbookTypes'

export const BASE = 'https://react-rslang-api.herokuapp.com/'

export const getNewUserTokenURL = (id: string | null) =>
  `${BASE}users/${id}/tokens`

export const getUserAggregatedAllWordsURL = (
  userId: string,
  group: number,
  page: number
) => `
  ${BASE}users/${userId}/aggregatedWords?wordsPerPage=20&filter=${`{"$and":[{ "page": ${page}},{ "group": ${group}},{"$or":[{"userWord.difficulty":"difficult"},{"userWord.difficulty":"studied"}]}]}`}
`

export const getUserAggregatedDifficultWordsURL = (userId: string) => `
  ${BASE}users/${userId}/aggregatedWords?wordsPerPage=3600&filter=${`{"$and":[{"userWord.difficulty":"difficult"}]}`}
`

export const getUserWordURL = (userId: string, wordId: string) => `
  ${BASE}users/${userId}/words/${wordId}
`

export const sections: ISectionData[] = [
  { name: 'Easy', code: 'A1', first: 1, last: 600 },
  { name: 'Easy', code: 'A2', first: 601, last: 1200 },
  { name: 'Normal', code: 'B1', first: 1201, last: 1800 },
  { name: 'Normal', code: 'B2', first: 1801, last: 2400 },
  { name: 'Hard', code: 'C1', first: 2401, last: 3000 },
  { name: 'Hard', code: 'C2', first: 3001, last: 3600 },
]
