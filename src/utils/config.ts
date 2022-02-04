const BASE = 'https://react-learnwords-example.herokuapp.com/'
const WORDS = `${BASE}words`

export const getWordsResponse = (group: number, page: number) =>
  `${WORDS}?group=${group}&page=${page}`
