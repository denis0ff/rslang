import { IGameRunProps } from '../../utils/types'

export const SprintGame = ({ words }: IGameRunProps) => {
  console.log(words)
  return <h2>SprintGame (Смотри консоль)</h2>
}