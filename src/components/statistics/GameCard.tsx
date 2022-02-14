import { IGameCardProps } from './types'

export const GameCard = ({ game, type }: IGameCardProps) => {
  return (
    <div>
      <h2>{game.}</h2>
      <ul>
        <li>Изучено слов</li>
        <li>Правильных ответов: </li>
        <li>Самая длинная серия правильных ответов: </li>
      </ul>
    </div>
  )
}
