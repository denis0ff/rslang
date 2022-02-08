import { useState } from 'react'
import { Difficulty } from '../components/games/Difficulty'
import { Result } from '../components/games/Result/Result'
import { SprintGame } from '../components/games/Sprint/SprintGame'
import { GameStatus, GameType, IAnswers } from '../components/games/types'
import { IWord } from '../utils/types'

export const Sprint = () => {
  const [status, setStatus] = useState(GameStatus.SELECT)
  const [words, setWords] = useState<IWord[]>([])
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
    return <Result answers={answers} words={words} setStatus={setStatus} />
  if (status === GameStatus.GAME)
    return (
      <SprintGame words={words} setStatus={setStatus} setAnswers={setAnswers} />
    )
  return null
}
