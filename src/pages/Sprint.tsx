import { useState } from 'react'
import { Difficulty } from '../components/games/Difficulty'
import { Result } from '../components/games/Result'
import { SprintGame } from '../components/games/Sprint/SprintGame'
import {
  GameStatus,
  GameType,
  IAnswers,
  IWords,
} from '../components/games/types'

export const Sprint = () => {
  const [status, setStatus] = useState(GameStatus.SELECT)
  const [words, setWords] = useState<IWords>({ chunk: [], page: -1, group: -1 })
  const [answers, setAnswers] = useState<IAnswers>({ good: [], bad: [] })
  if (status === GameStatus.SELECT)
    return (
      <Difficulty
        type={GameType.SPRINT}
        setStatus={setStatus}
        words={words}
        setWords={setWords}
      />
    )
  if (status === GameStatus.RESULT)
    return <Result answers={answers} setStatus={setStatus} />
  if (status === GameStatus.GAME)
    return (
      <SprintGame words={words} setStatus={setStatus} setAnswers={setAnswers} />
    )
  return null
}
