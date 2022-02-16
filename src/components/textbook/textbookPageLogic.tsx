import {
  addUserDifficultWordService,
  deleteUserDifficultWordService,
  getUserAggregatedWordsService,
  getWordsService,
} from './textbookServices'
import {
  IAggregatedWord,
  ITextbook,
  ITextbookMethods,
  IWordAddition,
} from './textbookTypes'

export const textbookPageLogic = (
  isAuth: boolean,
  textbook: ITextbook,
  updateTextbook: (item: ITextbook) => void
) => {
  const updateWords = (data: IAggregatedWord[], isNotReset?: boolean) => {
    textbook.words = data
    if (!isNotReset) textbook.counter.currentWord = 0
    updateTextbook(textbook)
  }

  const getWords = (isNotReset?: boolean) => {
    const wordProm = getWordsService(
      textbook.counter.currentGroup,
      textbook.counter.currentPage[textbook.counter.currentGroup] - 1
    )

    if (isAuth) {
      const aggrAllWordsProm = getUserAggregatedWordsService(
        'all',
        textbook.counter.currentGroup,
        textbook.counter.currentPage[textbook.counter.currentGroup] - 1
      )
      const aggrDiffWordsProm = getUserAggregatedWordsService('difficult')

      Promise.all([wordProm, aggrAllWordsProm, aggrDiffWordsProm]).then(
        ([words, aggAllResp, aggDiffResp]) => {
          if (aggAllResp && aggDiffResp) {
            aggAllResp.paginatedResults.forEach((item) => {
              for (let i = 0; i < words.length; i += 1) {
                if (words[i].id === item._id) {
                  words[i].userWord = item.userWord
                  break
                }
              }
            })
            textbook.difficultWordsCount =
              aggDiffResp.totalCount.length > 0
                ? aggDiffResp.totalCount[0].count
                : 0
          }
          updateWords(words, isNotReset)
        }
      )
    } else {
      wordProm.then((data) => {
        updateWords(data)
      })
    }
  }

  const getDifficultWords = () => {
    if (isAuth) {
      const aggrDiffWordsProm = getUserAggregatedWordsService('difficult')
      aggrDiffWordsProm.then((data) => {
        if (data) {
          const words = data.paginatedResults.map((item) => {
            item.id = item._id || ''
            return item
          })
          textbook.difficultWordsCount = data.totalCount.length
            ? data.totalCount[0].count
            : 0
          updateWords(words)
        }
      })
    }
  }

  const methods: ITextbookMethods = {
    getWords,
    pagingEvent: (page: number) => {
      textbook.counter.currentPage[textbook.counter.currentGroup] = page
      getWords()
    },
    groupEvent: (group: number) => {
      textbook.counter.currentGroup = group
      getWords()
    },
    groupDifficultEvent: (group: number) => {
      textbook.counter.currentGroup = group
      getDifficultWords()
    },
    getCurrentPage: () =>
      textbook.counter.currentPage[textbook.counter.currentGroup],
    getCurrentWord: () => textbook.words[textbook.counter.currentWord],
    wordEvent: (num: number) => {
      textbook.counter.currentWord = num
      updateTextbook(textbook)
    },
    difficultyWordEvent: (check: IWordAddition) => {
      const word = textbook.words.find((item) => item.id === check.id)
      if (word) {
        addUserDifficultWordService(word, check.isNew, check.difficulty).then(
          (data) => {
            if (data) {
              if (textbook.counter.currentGroup < 6) getWords(true)
              else getDifficultWords()
            }
          }
        )
      }
    },
    deleteDifficultyWordEvent: (id: string) => {
      deleteUserDifficultWordService(id).then((data) => {
        if (data) {
          if (textbook.counter.currentGroup < 6) getWords(true)
          else getDifficultWords()
        }
      })
    },
  }
  return methods
}
