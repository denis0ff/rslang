import styled from 'styled-components'
import { checkIsNaN } from '../../utils/utils'
import { WrapperRow } from '../games/Difficulty'
import { IWordStatProps } from './types'

export const Section = styled.section`
  margin: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`

export const Title = styled.h2`
  font-size: 2rem;
  padding-bottom: 0.5em;
`

export const Subtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: normal;
  text-align: center;
  b {
    display: block;
    font-size: 5em;
    line-height: 1em;
  }
`

const WrapperRowStat = styled(WrapperRow)`
  gap: 2em;
`

export const WordStat = ({ learnedWords, newWords, right }: IWordStatProps) => {
  return (
    <Section>
      <Title>Статистика за сегодня</Title>
      <WrapperRowStat>
        <Subtitle>
          <b>{newWords}</b> новых слов
        </Subtitle>
        <Subtitle>
          <b>{(checkIsNaN(right) * 100).toFixed(0)}%</b> правильных ответов
        </Subtitle>
        <Subtitle>
          <b>{learnedWords}</b> слов изучено
        </Subtitle>
      </WrapperRowStat>
    </Section>
  )
}
