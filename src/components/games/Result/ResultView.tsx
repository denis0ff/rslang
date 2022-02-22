import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Paths } from '../../../utils/types'
import { WrapperRow } from '../Difficulty'
import { IResultViewProps, ResultViews } from '../types'
import { ProgressBar } from './ProgressBar'

export const TextLink = styled.h3`
  margin: 0.5em auto;
  width: fit-content;
  text-transform: uppercase;
  font-size: 0.9em;
  border-bottom: dashed 1px #fafafa;
  cursor: pointer;
  &:hover {
    color: wheat;
    border-color: wheat;
  }
`

export const GameLink = styled.div`
  font-size: 18px;
  transition: 300ms;
  cursor: pointer;
  border-bottom: solid 2px transparent;
  text-transform: uppercase;
  &:hover {
    color: wheat;
    border-color: wheat;
  }
`

export const TextbookLink = styled(Link)`
  padding: 0;
  font-size: 18px;
  transition: 300ms;
  border-bottom: solid 2px transparent;
  text-transform: uppercase;
  &:hover {
    color: wheat;
    border-color: wheat;
  }
`

const getResultText = (percent: number) => {
  if (percent > 0.5) return 'Ты можешь лучше! Повтори слова и возвращайся! :)'
  if (percent > 0.75)
    return 'Ты сыграл очень хорошо! Но есть над чем еще поработать.'
  if (percent > 0.95) return 'Ты сыграл блестяще! Мне нечему тебя учить..'
  return 'В этот раз не получилось, но продолжай тренироваться!'
}

export const ResultView = ({
  right,
  wrong,
  nextGame,
  setActive,
}: IResultViewProps) => (
  <>
    <h3>{getResultText((right / (right + wrong)) * 100)}</h3>
    <TextLink onClick={() => setActive(ResultViews.WORDS)}>
      {right} правильно, {wrong} ошибся
    </TextLink>
    <ProgressBar percent={(right / (right + wrong)) * 100} />
    <WrapperRow>
      <GameLink onClick={() => nextGame()}>Сыграть ещё раз</GameLink>
      <TextbookLink to={`../${Paths.TEXTBOOK}`}>Перейти в учебник</TextbookLink>
    </WrapperRow>
  </>
)
