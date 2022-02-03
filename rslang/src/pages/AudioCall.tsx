import { useState } from 'react'
import { Difficulty } from '../components/games/Difficulty'
import { AudioCallGame } from '../components/games/AudioCallGame'
import { IGame } from '../utils/types'

export const AudioCall = () => {
  const [game, setGame] = useState<IGame>({ status: 'select' })
  if (game.status === 'select')
    return <Difficulty type="audiocall" setGame={setGame} />
  if (game.words) return <AudioCallGame words={game.words} />
  return null
}
