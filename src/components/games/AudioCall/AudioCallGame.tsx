import { IGameRunProps } from '../types'

export const AudioCallGame = ({
  words,
  setStatus,
  setAnswers,
}: IGameRunProps) => {
  console.log(words, setStatus, setAnswers)
  return <h2>AudioCallGame (Смотри консоль)</h2>
}
