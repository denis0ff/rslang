import React, { useState } from 'react'
import {
  addUserDifficultWordService,
  deleteUserDifficultWordService,
  getUserAggregatedWordsService,
  getWordsService,
} from '../components/textbook/services'
import { Textbook } from '../components/textbook/Textbook'
import {
  IAggregatedWord,
  ITextbook,
  ITextbookMethods,
  IWordAddition,
} from '../components/textbook/types'
import { AuthContext } from '../utils/services'

export const TextbookPage = () => {
  const { isAuth } = React.useContext(AuthContext)
  const [textbook, setTextbook] = useState<ITextbook>({
    sections: [
      { name: 'Easy', code: 'A1', first: 1, last: 600 },
      { name: 'Easy', code: 'A2', first: 601, last: 1200 },
      { name: 'Normal', code: 'B1', first: 1201, last: 1800 },
      { name: 'Normal', code: 'B2', first: 1801, last: 2400 },
      { name: 'Hard', code: 'C1', first: 2401, last: 3000 },
      { name: 'Hard', code: 'C2', first: 3001, last: 3600 },
    ],
    counter: {
      currentGroup: 0,
      currentPage: new Array(7).fill(1),
      currentWord: 0,
      countPage: 30,
    },
    words: new Array<IAggregatedWord>(),
    difficultWordsCount: 0,
  })

  const updateTextbook = (item: ITextbook) => {
    setTextbook(() => ({ ...item }))
  }

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
            item.id = item._id
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
      addUserDifficultWordService(check).then((data) => {
        if (data) {
          if (textbook.counter.currentGroup < 6) getWords(true)
          else getDifficultWords()
        }
      })
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
  React.useEffect(() => {
    getWords()
  }, [])

  return <Textbook state={textbook} methods={methods} />
}
