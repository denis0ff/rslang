import { useState } from 'react'
import { Difficulty } from '../components/games/Difficulty'
import { AudioCallGame } from '../components/games/AudioCallGame'
import { IGame } from '../utils/types'
import { Result } from '../components/games/Result'

export const AudioCall = () => {
  const [game, setGame] = useState<IGame>({ status: 'select' })
  if (game.status === 'select')
    return <Difficulty type="audiocall" setGame={setGame} />
  if (game.status === 'result' && game.answers) return <Result answers={game.answers} setGame={setGame}/>
  if (game.status === 'game' && game.words) return <AudioCallGame words={game.words} setGame={setGame} />
  return null
}
