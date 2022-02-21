import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { getWordsPromise } from '../../utils/services'
import { AudioCallDescription } from './AudioCall/AudioCallDescription'
import { SprintDescription } from './Sprint/SprintDescription'
import { GameStatus, GameType, IDifficultyProps } from './types'

export const Container = styled.section`
  text-align: center;
`

export const Description = styled.article``

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  font-size: 1.5rem;
`

export const WrapperRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  flex-grow: 1;
`

export const Button = styled.button`
  padding: 0.5rem 1rem;
  width: max-content;
  font-size: 1.1rem;
  background-color: transparent;
  color: inherit;
  border-color: inherit;
  border-radius: 20rem;
  cursor: pointer;
  transition: 300ms;
  &:hover {
    border-color: wheat;
    color: wheat;
  }
  &:disabled {
    border-color: grey;
    color: grey;
    cursor: not-allowed;
  }
`

export const DifficultyButton = styled(Button)<{ isActive: boolean }>`
  padding: 0.5rem;
  background-color: ${({ isActive }) => (isActive ? '#35c77e89' : 'inherit')};
`

const difficulties = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const Difficulty = ({
  type,
  setStatus,
  words,
  setWords,
}: IDifficultyProps) => {
  const [active, setActive] = useState('')

  const getWords = useCallback(
    async (group, key) => {
      setActive(key)
      if (key !== active)
        await getWordsPromise(group).then(({ data }) => setWords(data))
    },
    [active, setWords]
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
            <DifficultyButton
              key={key}
              isActive={key === active}
              onClick={() => getWords(index, key)}
            >
              {key}
            </DifficultyButton>
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
