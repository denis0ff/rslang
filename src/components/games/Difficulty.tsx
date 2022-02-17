import { useCallback } from 'react'
import styled from 'styled-components'
import { getWordsPromise } from '../../utils/services'
import { AudioCallDescription } from './AudioCall/AudioCallDescription'
import { SprintDescription } from './Sprint/SprintDescription'
import { GameStatus, GameType, IDifficultyProps } from './types'

const Container = styled.section`
  text-align: center;
`

const Description = styled.article``

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`

export const WrapperRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  const getWords = useCallback(
    (group) => {
      getWordsPromise(group).then(({ data }) => setWords(data))
    },
    [words]
  )

  return (
    <Container>
      <Description>
        {type === GameType.AUDIO_CALL ? (
          <AudioCallDescription />
        ) : (
          <SprintDescription />
        )}
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
          disabled={words.length === 0}
          onClick={() => setStatus(GameStatus.GAME)}
        >
          Начать
        </Button>
      </Wrapper>
    </Container>
  )
}
