import { IAggregatedWord, ITextbook } from './textbookTypes'

export const initTextbookState = () => {
  const data = localStorage.getItem('textbookState')
  if (data) {
    const state = JSON.parse(data) as ITextbook
    state.words = new Array<IAggregatedWord>()
    state.aggrWords = new Array<IAggregatedWord>()
    return state
  }
  return {
    counter: {
      currentGroup: 0,
      currentPage: new Array(7).fill(1),
      currentWord: 0,
      countPage: 30,
      difficultWordsCount: 0,
    },
    words: new Array<IAggregatedWord>(),
    aggrWords: new Array<IAggregatedWord>(),
  }
}
