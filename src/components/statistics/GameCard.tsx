import { checkIsNaN } from '../../utils/utils'
import { IGameCardProps } from './types'

export const GameCard = ({ game, type }: IGameCardProps) => {
  return (
    <div>
      <h2>{type}</h2>
      <ul>
        <li>Новых слов: {game.newWords}</li>
        <li>
          Правильных ответов:{' '}
          {(checkIsNaN(game.right / game.allWords) * 100).toFixed(2)}%
        </li>
        <li>Самая длинная серия правильных ответов: {game.streak}</li>
      </ul>
    </div>
  )
}
