import { useState } from 'react'
import { AudioCallGame } from '../components/games/AudioCall/AudioCallGame'
import { Difficulty } from '../components/games/Difficulty'
import { Result } from '../components/games/Result'
import { GameType, IAnswers, IWords } from '../components/games/types'

export const AudioCall = () => {
  const [status, setStatus] = useState('select')
  const [words, setWords] = useState<IWords>({ chunk: [], page: -1 })
  const [answers, setAnswers] = useState<IAnswers>({ good: [], bad: [] })
  if (status === 'select')
    return (
      <Difficulty
        type={GameType.AUDIO_CALL}
        setStatus={setStatus}
        words={words}
        setWords={setWords}
      />
    )
  if (status === 'result')
    return <Result answers={answers} setStatus={setStatus} />
  if (status === 'game')
    return (
      <AudioCallGame
        words={words}
        setStatus={setStatus}
        setAnswers={setAnswers}
      />
    )
  return null
}
