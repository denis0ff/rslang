import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Title } from '../../../pages/NotFound'
import { Paths } from '../../../utils/types'
import { WrapperRow } from '../Difficulty'
import { IResultViewProps } from '../types'

export const TextLink = styled.h3``

export const GameLink = styled.div``

export const TextbookLink = styled(Link)`
  padding: 0;
`

export const ResultView = ({ right, wrong, nextGame }: IResultViewProps) => (
  <>
    <Title>Ты молодец!</Title>
    <TextLink>
      {right} ответил успешно, {wrong} ответил не верно
    </TextLink>
    <WrapperRow>
      <GameLink onClick={() => nextGame()}>Сыграть ещё раз</GameLink>
      <TextbookLink to={`../${Paths.TEXTBOOK}`}>Перейти в учебник</TextbookLink>
    </WrapperRow>
  </>
)
