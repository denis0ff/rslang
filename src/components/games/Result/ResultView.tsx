import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Title } from '../../../pages/NotFound'
import { Paths } from '../../../utils/types'
import { WrapperRow } from '../Difficulty'
import { GameStatus, IResultViewProps } from '../types'

const TextLink = styled.p``

const GameLink = styled.div``

const TextbookLink = styled(Link)`
  padding: 0;
`

export const ResultView = ({ good, bad, setStatus }: IResultViewProps) => (
  <>
    <Title>Ты молодец!</Title>
    <TextLink>
      {good} изучено, {bad} на изучении
    </TextLink>
    <WrapperRow>
      <GameLink onClick={() => setStatus(GameStatus.SELECT)}>
        Сыграть ещё раз
      </GameLink>
      <TextbookLink to={Paths.TEXTBOOK}>Перейти в учебник</TextbookLink>
    </WrapperRow>
  </>
)
