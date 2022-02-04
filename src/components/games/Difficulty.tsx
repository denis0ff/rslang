import { useCallback } from 'react'
import styled from 'styled-components'
import { getWordsPromise } from '../../utils/services'
import { getRandomInteger } from '../../utils/utils'
import { GameType, IDifficultyProps } from './types'

const Container = styled.section`
  text-align: center;
`

const Title = styled.h2``

const Description = styled.p``

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`

export const WrapperRow = styled.div`
  display: flex;
  gap: 0.5em;
`

const Button = styled.button`
  width: max-content;
`

const difficulties = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const Difficulty = ({
  type,
  setStatus,
  words,
  setWords,
}: IDifficultyProps) => {
  const getWords = useCallback((group) => {
    const page = getRandomInteger(0, 30)
    getWordsPromise(group, page).then(({ data }) =>
      setWords((prev) => ({ ...prev, chunk: data, page }))
    )
  }, [])

  return (
    <Container>
      <Title>{type === GameType.AUDIO_CALL ? 'Аудиовызов' : 'Спринт'}</Title>
      <Description>
        {type === GameType.AUDIO_CALL
          ? 'Аудиовызов улучшает восприятие речи. Угадай слова на слух'
          : 'Спринт - тренировка на скорость. Угадай как можно больше слов за 30 секунд'}
      </Description>
      <Wrapper>
        Выбери уровень сложности:
        <WrapperRow>
          {difficulties.map((key, index) => (
            <Button key={key} onClick={() => getWords(index)}>
              {key}
            </Button>
          ))}
        </WrapperRow>
        <Button
          disabled={words.chunk.length === 0}
          onClick={() => setStatus('game')}
        >
          Начать
        </Button>
      </Wrapper>
    </Container>
  )
}
