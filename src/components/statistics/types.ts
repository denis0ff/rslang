import { IGameStat } from '../../utils/types'
import { GameType } from '../games/types'

export interface IWordStatProps {
  newWords: number
  learnedWords: number
  right: number
}

export interface IGameStatsProps {
  games: {
    sprint: IGameStat
    audioCall: IGameStat
  }
}

export interface IGameCardProps {
  game: IGameStat
  type: GameType
}

export interface ILongStatProps {
  longStat: string
  allWords: string
}
