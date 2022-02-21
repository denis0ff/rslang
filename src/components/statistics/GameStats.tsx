import styled from 'styled-components'
import { GameType } from '../games/types'
import { GameCard } from './GameCard'
import { IGameStatsProps } from './types'
import { Section } from './WordStats'

const GameSection = styled(Section)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

export const GameStat = ({ games }: IGameStatsProps) => {
  return (
    <GameSection>
      <GameCard game={games.sprint} type={GameType.SPRINT} />
      <GameCard game={games.audioCall} type={GameType.AUDIO_CALL} />
    </GameSection>
  )
}
