import React, { useState } from 'react'
import { Textbook } from '../components/textbook/Textbook'
import {
  IAggregatedWord,
  ITextbook,
} from '../components/textbook/textbookTypes'
import { AuthContext } from '../utils/services'
import { textbookPageLogic } from '../components/textbook/textbookPageLogic'

export const TextbookPage = () => {
  const { isAuth } = React.useContext(AuthContext)
  const [textbook, setTextbook] = useState<ITextbook>({
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

  const methods = textbookPageLogic(isAuth, textbook, updateTextbook)

  React.useEffect(() => {
    methods.getWords()
  }, [])
  return <Textbook state={textbook} methods={methods} />
}
