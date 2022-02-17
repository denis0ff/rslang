import { GameType } from '../games/types'
import { GameCard } from './GameCard'
import { IGameStatsProps } from './types'

export const GameStat = ({ games }: IGameStatsProps) => {
  return (
    <article>
      <GameCard game={games.sprint} type={GameType.SPRINT} />
      <GameCard game={games.audioCall} type={GameType.AUDIO_CALL} />
    </article>
  )
}
