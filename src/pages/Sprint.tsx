import { useState } from 'react'
import { Difficulty } from '../components/games/Difficulty'
import { Result } from '../components/games/Result/Result'
import { SprintGame } from '../components/games/Sprint/SprintGame'
import { GameStatus, GameType, IAnswers } from '../components/games/types'
import { IWord } from '../utils/types'

export const Sprint = () => {
  const [status, setStatus] = useState(GameStatus.SELECT)
  const [words, setWords] = useState<IWord[]>([])
  const [answers, setAnswers] = useState<IAnswers>({
    right: [],
    wrong: [],
    streak: 0,
    max: 0,
  })
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
    return (
      <Result
        answers={answers}
        words={words}
        setAnswers={setAnswers}
        setWords={setWords}
        setStatus={setStatus}
      />
    )
  if (status === GameStatus.GAME)
    return (
      <SprintGame
        words={words}
        answers={answers}
        setStatus={setStatus}
        setAnswers={setAnswers}
      />
    )
  return null
}
