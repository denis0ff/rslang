import {
  addUserDifficultWordService,
  deleteUserDifficultWordService,
  getUserAggregatedWordsService,
  getWordsService,
} from './textbookServices'
import { ITextbook, ITextbookMethods, IWordAddition } from './textbookTypes'

export const textbookPageLogic = (
  isAuth: boolean,
  textbook: ITextbook,
  setTextbook: (value: React.SetStateAction<ITextbook>) => void
) => {
  const getWords = (group: number, page: number, isNotReset?: boolean) => {
    const wordProm = getWordsService(group, page - 1)

    const arrPage = [...textbook.counter.currentPage]
    arrPage[group] = page

    const cW = !isNotReset ? 0 : textbook.counter.currentWord

    if (isAuth) {
      const aggrWordsProm = getUserAggregatedWordsService('all')

      Promise.all([wordProm, aggrWordsProm]).then(([words, aggResp]) => {
        if (aggResp) {
          words.forEach((word) => {
            for (let i = 0; i < aggResp.paginatedResults.length; i += 1) {
              if (word.id === aggResp.paginatedResults[i]._id) {
                word.userWord = aggResp.paginatedResults[i].userWord
                break
              }
            }
          })
          setTextbook((prev) => ({
            ...prev,
            words,
            aggrWords: aggResp.paginatedResults,
            counter: {
              ...prev.counter,
              currentGroup: group,
              currentWord: cW,
              currentPage: arrPage,
              difficultWordsCount: aggResp.paginatedResults.filter(
                (word) =>
                  !!word.userWord && word.userWord.difficulty === 'difficult'
              ).length,
            },
          }))
        }
      })
    } else {
      wordProm.then((data) => {
        setTextbook((prev) => ({
          ...prev,
          words: data,
          counter: {
            ...prev.counter,
            currentGroup: group,
            currentWord: cW,
            currentPage: arrPage,
          },
        }))
      })
    }
  }

  const getDifficultWords = (group: number) => {
    if (isAuth) {
      const aggrDiffWordsProm = getUserAggregatedWordsService('difficult')
      aggrDiffWordsProm.then((data) => {
        if (data) {
          const words = data.paginatedResults.map((item) => {
            item.id = item._id || ''
            return item
          })
          setTextbook((prev) => ({
            ...prev,
            words,
            counter: {
              ...prev.counter,
              currentGroup: group,
              currentWord: 0,
              difficultWordsCount: words.filter(
                (word) =>
                  !!word.userWord && word.userWord.difficulty === 'difficult'
              ).length,
            },
          }))
        }
      })
    }
  }

  const methods: ITextbookMethods = {
    getPageWords: () => {
      let group = textbook.counter.currentGroup
      if (textbook.counter.currentGroup > 5 && !isAuth) group = 0
      getWords(
        group,
        textbook.counter.currentPage[textbook.counter.currentGroup]
      )
    },
    pagingEvent: (page: number) => {
      getWords(textbook.counter.currentGroup, page)
    },
    groupEvent: (group: number) => {
      getWords(group, textbook.counter.currentPage[group])
    },
    groupDifficultEvent: (group: number) => {
      getDifficultWords(group)
    },
    getCurrentPage: () =>
      textbook.counter.currentPage[textbook.counter.currentGroup],
    getCurrentWord: () => textbook.words[textbook.counter.currentWord],
    wordEvent: (num: number) => {
      setTextbook((prev) => ({
        ...prev,
        counter: {
          ...prev.counter,
          currentWord: num,
        },
      }))
    },
    difficultyWordEvent: (check: IWordAddition) => {
      const word = textbook.words.find((item) => item.id === check.id)
      if (word) {
        addUserDifficultWordService(word, check.isNew, check.difficulty).then(
          (data) => {
            if (data) {
              if (textbook.counter.currentGroup < 6)
                getWords(
                  textbook.counter.currentGroup,
                  textbook.counter.currentPage[textbook.counter.currentGroup],
                  true
                )
              else getDifficultWords(textbook.counter.currentGroup)
            }
          }
        )
      }
    },
    deleteDifficultyWordEvent: (id: string) => {
      deleteUserDifficultWordService(id).then((data) => {
        if (data) {
          if (textbook.counter.currentGroup < 6)
            getWords(
              textbook.counter.currentGroup,
              textbook.counter.currentPage[textbook.counter.currentGroup],
              true
            )
          else getDifficultWords(textbook.counter.currentGroup)
        }
      })
    },
    getMarkPages: (group: number) => {
      const arrCount = new Array<number>(textbook.counter.countPage).fill(0)
      if (isAuth && textbook.aggrWords.length > 0) {
        for (let i = 0; i < arrCount.length; i += 1) {
          arrCount[i] = textbook.aggrWords.filter(
            (word) =>
              word.group === group &&
              word.page === i &&
              word.userWord &&
              (word.userWord?.difficulty === 'difficult' ||
                word.userWord?.difficulty === 'studied')
          ).length
        }
      }
      console.log(arrCount)
      return arrCount.map((item) => item === 20)
    },
  }
  return methods
}
