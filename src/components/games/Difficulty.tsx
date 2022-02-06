import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { getWordsPromise } from '../../utils/services'
import { IDifficultyProps } from './types'

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

export const Difficulty = ({ type, setGame }: IDifficultyProps) => {
  const [words, SetWords] = useState([])
  const getWords = useCallback(
    (group) => getWordsPromise(group).then(({ data }) => SetWords(data)),
    []
  )

  return (
    <Container>
      <Title>{type === 'audiocall' ? 'Аудиовызов' : 'Спринт'}</Title>
      <Description>
        {type === 'audiocall'
          ? 'Аудиовызов улучшает восприятие речи. Угадай слова на слух'
          : 'Спринт - тренировка на скорость. Угадай как можно больше слов за 30 секунд'}
      </Description>
      <Wrapper>
        Выбери уровень сложности:
        <WrapperRow>
          <Button onClick={() => getWords(0)}>A1</Button>
          <Button onClick={() => getWords(1)}>A2</Button>
          <Button onClick={() => getWords(2)}>B1</Button>
          <Button onClick={() => getWords(3)}>B2</Button>
          <Button onClick={() => getWords(4)}>C1</Button>
          <Button onClick={() => getWords(5)}>C2</Button>
        </WrapperRow>
        <Button onClick={() => setGame({ status: 'game', words })}>
          Начать
        </Button>
      </Wrapper>
    </Container>
  )
}
