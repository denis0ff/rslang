import { useState } from 'react'
import { Difficulty } from '../components/games/Difficulty'
import { SprintGame } from '../components/games/SprintGame'
import { IGame } from '../utils/types'

export const Sprint = () => {
  const [game, setGame] = useState<IGame>({ status: 'select' })
  if (game.status === 'select')
    return <Difficulty type="sprint" setGame={setGame} />
  if (game.words) return <SprintGame words={game.words} />
  return null
}
