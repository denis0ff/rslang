import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AudioCallGame } from '../components/games/AudioCall/AudioCallGame'
import { CustomGame } from '../components/games/CustomGame'
import { Difficulty } from '../components/games/Difficulty'
import { NotEnoughWords } from '../components/games/NotEnoughWords'
import { Result } from '../components/games/Result/Result'
import { GameStatus, GameType, IAnswers } from '../components/games/types'
import { IWord } from '../utils/types'

export const AudioCall = () => {
  const { state } = useLocation()
  console.log(state)

  const [status, setStatus] = useState(
    state ? GameStatus.TEXTBOOK : GameStatus.SELECT
  )
  const [words, setWords] = useState<IWord[]>((state as IWord[] | null) || [])
  const [answers, setAnswers] = useState<IAnswers>({
    right: [],
    wrong: [],
    streak: 0,
    max: 0,
  })

  if (status === GameStatus.SELECT)
    return (
      <Difficulty
        type={GameType.AUDIO_CALL}
        words={words}
        setWords={setWords}
        setStatus={setStatus}
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
      <AudioCallGame
        words={words}
        answers={answers}
        setStatus={setStatus}
        setAnswers={setAnswers}
      />
    )
  if (status === GameStatus.TEXTBOOK)
    return (
      <CustomGame
        type={GameType.AUDIO_CALL}
        words={words}
        setWords={setWords}
        setStatus={setStatus}
      />
    )
  return <NotEnoughWords setStatus={setStatus} setWords={setWords} />
}
