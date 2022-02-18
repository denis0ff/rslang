import React, { useState } from 'react'
import { Textbook } from '../components/textbook/Textbook'
import {
  IAggregatedWord,
  ITextbook,
} from '../components/textbook/textbookTypes'
import { AuthContext } from '../utils/services'
import { textbookPageLogic } from '../components/textbook/textbookPageLogic'

const local = () => {
  const data = localStorage.getItem('textbookState')
  if (data) {
    return JSON.parse(data) as ITextbook
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

export const TextbookPage = () => {
  const { isAuth } = React.useContext(AuthContext)
  const [textbook, setTextbook] = useState<ITextbook>(local())

  const methods = textbookPageLogic(isAuth, textbook, setTextbook)

  React.useEffect(() => {
    localStorage.setItem('textbookState', JSON.stringify(textbook))
  }, [textbook])

  React.useEffect(() => {
    if (textbook.counter.currentGroup > 5 && isAuth)
      methods.groupDifficultEvent(6)
    else methods.getPageWords()
  }, [isAuth])

  return <Textbook state={textbook} methods={methods} />
}
