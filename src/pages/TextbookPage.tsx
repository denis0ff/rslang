import React, { useState } from 'react'
import { getWordsService } from '../components/textbook/services'
import { Textbook } from '../components/textbook/Textbook'
import { ITextbook, ITextbookMethods } from '../components/textbook/types'
import { IWord } from '../utils/types'

export const TextbookPage = () => {
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
      currentPage: new Array(6).fill(1),
      currentWord: new Array(7).fill(0),
      countPage: 30,
    },
    words: new Array<IWord>(),
  })

  const updateTextbook = (item: ITextbook) => {
    setTextbook(() => ({ ...item }))
  }

  const getWords = () => {
    getWordsService(
      textbook.counter.currentGroup,
      textbook.counter.currentPage[textbook.counter.currentGroup] - 1
    ).then((data) => {
      textbook.words = data
      updateTextbook(textbook)
    })
  }

  const methods: ITextbookMethods = {
    pagingEvent: (page: number) => {
      textbook.counter.currentPage[textbook.counter.currentGroup] = page
      getWords()
    },
    groupEvent: (group: number) => {
      textbook.counter.currentGroup = group
    },
    getCurrentPage: () =>
      textbook.counter.currentPage[textbook.counter.currentGroup],
    getCurrentWord: () =>
      textbook.words[
        textbook.counter.currentWord[textbook.counter.currentGroup]
      ],
    setCurrentWord: (num: number) => {
      textbook.counter.currentWord[textbook.counter.currentGroup] = num
      updateTextbook(textbook)
    },
  }

  React.useEffect(() => {
    getWords()
  }, [])

  return (
    <Textbook state={textbook} setState={updateTextbook} methods={methods} />
  )
}
