import { WordDifficulties } from '../../utils/types'
import {
  addUserDifficultWordService,
  deleteUserDifficultWordService,
  getUserAggregatedWordsService,
  getWordsService,
} from './textbookServices'
import { ITextbook, ITextbookMethods, IWordAddition } from './textbookTypes'
import { changeStats } from './utils/stats'

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
      const aggrWordsProm = getUserAggregatedWordsService()

      Promise.all([wordProm, aggrWordsProm]).then(([wordsResp, aggResp]) => {
        if (aggResp) {
          setTextbook((prev) => ({
            ...prev,
            words: wordsResp,
            aggrWords: aggResp.paginatedResults,
            counter: {
              ...prev.counter,
              currentGroup: group,
              currentWord: cW,
              currentPage: arrPage,
              difficultWordsCount: aggResp.paginatedResults.filter(
                (word) =>
                  !!word.userWord &&
                  word.userWord.difficulty === WordDifficulties.DIFFICULT
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
      const aggrDiffWordsProm = getUserAggregatedWordsService(
        WordDifficulties.DIFFICULT
      )
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
                  !!word.userWord &&
                  word.userWord.difficulty === WordDifficulties.DIFFICULT
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
        words: [...prev.words],
        aggrWords: [...prev.aggrWords],
      }))
    },
    difficultyWordEvent: (check: IWordAddition) => {
      const word = textbook.words.find((item) => item.id === check.id)
      if (word) {
        addUserDifficultWordService(word, check.isNew, check.difficulty).then(
          (data) => {
            if (data) {
              changeStats()
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
          changeStats()
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
      return arrCount.map((item) => item === 20)
    },
  }
  return methods
}
