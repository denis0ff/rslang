import { useState } from 'react'
import { Difficulty } from '../components/games/Difficulty'
import { AudioCallGame } from '../components/games/AudioCallGame'
import { IGame } from '../utils/types'

export const AudioCall = () => {
  const [game, SetGame] = useState<IGame>({ status: 'select' })
  return game.status === 'select' ? (
    <Difficulty type="audiocall" SetGame={SetGame} />
  ) : (
    <AudioCallGame words={game.words} />
  )
}
