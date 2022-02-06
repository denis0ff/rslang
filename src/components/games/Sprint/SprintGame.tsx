import { IGameRunProps } from '../types'

export const SprintGame = ({ words, setStatus, setAnswers }: IGameRunProps) => {
  console.log(words, setStatus, setAnswers)
  return <h2>SprintGame (Смотри консоль)</h2>
}
