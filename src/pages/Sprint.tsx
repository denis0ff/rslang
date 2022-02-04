import { useState } from 'react'
import { Difficulty } from '../components/games/Difficulty'
import { Result } from '../components/games/Result'
import { SprintGame } from '../components/games/Sprint/SprintGame'
import { GameType, IAnswers, IWords } from '../components/games/types'

export const Sprint = () => {
  const [status, setStatus] = useState('select')
  const [words, setWords] = useState<IWords>({ chunk: [], page: -1 })
  const [answers, setAnswers] = useState<IAnswers>({ good: [], bad: [] })
  if (status === 'select')
    return (
      <Difficulty
        type={GameType.SPRINT}
        setStatus={setStatus}
        words={words}
        setWords={setWords}
      />
    )
  if (status === 'result')
    return <Result answers={answers} setStatus={setStatus} />
  if (status === 'game')
    return (
      <SprintGame words={words} setStatus={setStatus} setAnswers={setAnswers} />
    )
  return null
}
