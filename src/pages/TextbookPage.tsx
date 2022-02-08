import { useState } from 'react'
import { Textbook } from '../components/textbook/Textbook'
import { ITextbook, ITextbookMethods } from '../components/textbook/types'

export const TextbookPage = () => {
  const [textbookState, setTextbookState] = useState<ITextbook>({
    sections: [
      { name: 'Easy', code: 'A1', first: 1, last: 600 },
      { name: 'Easy', code: 'A2', first: 601, last: 1200 },
      { name: 'Normal', code: 'B1', first: 1201, last: 1800 },
      { name: 'Normal', code: 'B2', first: 1801, last: 2400 },
      { name: 'Hard', code: 'C1', first: 2401, last: 3000 },
      { name: 'Hard', code: 'C2', first: 3001, last: 3600 },
    ],
    pageCounter: {
      countItems: 0,
      currentPage: 1,
      countPage: 30,
      itemPerPage: 20,
    },
  })

  const updateTextbookState = (item: ITextbook) => {
    setTextbookState(() => ({ ...item }))
  }

  const methods: ITextbookMethods = {
    pagingEvent: (num: number) => {
      textbookState.pageCounter.currentPage = num
      updateTextbookState(textbookState)
    },
  }

  return (
    <Textbook
      state={textbookState}
      setState={updateTextbookState}
      methods={methods}
    />
  )
}
