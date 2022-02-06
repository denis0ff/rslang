import { useState } from 'react'
import { AudioCallGame } from '../components/games/AudioCall/AudioCallGame'
import { Difficulty } from '../components/games/Difficulty'
import { Result } from '../components/games/Result/Result'
import { GameStatus, GameType, IAnswers } from '../components/games/types'
import { IWord } from '../utils/types'

export const AudioCall = () => {
  const [status, setStatus] = useState(GameStatus.SELECT)
  const [words, setWords] = useState<IWord[]>([])
  const [answers, setAnswers] = useState<IAnswers>({ good: [], bad: [] })
  if (status === GameStatus.SELECT)
    return (
      <Difficulty
        type={GameType.AUDIO_CALL}
        setStatus={setStatus}
        words={words}
        setWords={setWords}
      />
    )
  if (status === GameStatus.RESULT)
    return <Result answers={answers} setStatus={setStatus} />
  if (status === GameStatus.GAME)
    return (
      <AudioCallGame
        words={words}
        setStatus={setStatus}
        setAnswers={setAnswers}
      />
    )
  return null
}
