import { useState } from 'react'
import { Difficulty } from '../components/games/Difficulty'
import { SprintGame } from '../components/games/SprintGame'
import { IGame } from '../utils/types'

export const Sprint = () => {
  const [game, SetGame] = useState<IGame>({ status: 'select' })
  return game.status === 'select' ? (
    <Difficulty type="sprint" SetGame={SetGame} />
  ) : (
    <SprintGame words={game.words} />
  )
}
