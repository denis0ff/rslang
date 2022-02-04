import { useState } from 'react'
import { Difficulty } from '../components/games/Difficulty'
import { SprintGame } from '../components/games/Sprint/SprintGame'
import { IGame } from '../components/games/types'

export const Sprint = () => {
  const [game, setGame] = useState<IGame>({ status: 'select' })
  return game.status === 'select' ? (
    <Difficulty type="sprint" setGame={setGame} />
  ) : (
    <SprintGame words={game.words} />
  )
}
