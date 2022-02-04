import { useState } from 'react'
import { AudioCallGame } from '../components/games/AudioCall/AudioCallGame'
import { Difficulty } from '../components/games/Difficulty'
import { IGame } from '../components/games/types'

export const AudioCall = () => {
  const [game, setGame] = useState<IGame>({ status: 'select' })
  return game.status === 'select' ? (
    <Difficulty type="audiocall" setGame={setGame} />
  ) : (
    <AudioCallGame words={game.words} />
  )
}
