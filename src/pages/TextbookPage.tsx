import React, { useState } from 'react'
import { Textbook } from '../components/textbook/Textbook'
import { ITextbook } from '../components/textbook/textbookTypes'
import { AuthContext } from '../utils/services'
import { textbookPageLogic } from '../components/textbook/textbookPageLogic'
import { Footer } from '../components/ui/Footer/Footer'
import { initTextbookState } from '../components/textbook/textbookUtils'

export const TextbookPage = () => {
  const { isAuth } = React.useContext(AuthContext)
  const [textbook, setTextbook] = useState<ITextbook>(initTextbookState())

  const methods = textbookPageLogic(isAuth, textbook, setTextbook)

  React.useEffect(() => {
    localStorage.setItem('textbookState', JSON.stringify(textbook))
  }, [textbook])

  React.useEffect(() => {
    if (textbook.counter.currentGroup > 5 && isAuth)
      methods.groupDifficultEvent(6)
    else methods.getPageWords()
  }, [isAuth])

  return (
    <>
      <Textbook state={textbook} methods={methods} />
      <Footer />
    </>
  )
}
