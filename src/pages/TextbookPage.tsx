import { useState } from 'react'
import { Textbook } from '../components/textbook/Textbook'
import { ITextbook } from '../components/textbook/types'

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
  })
  return <Textbook sections={textbook.sections} />
}
