import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { WrapperRow } from '../Difficulty'
import { GameStatus, IResultProps, ResultViews, WordListType } from '../types'
import { ResultView } from './ResultView'
import { WordList } from './WordList'

export const Wrapper = styled.div`
  margin: 5rem auto;
  padding: 1em;
  max-width: 500px;
  width: 90%;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  gap: 0.5em;
  box-shadow: 0px 8px 40px 20px rgb(34 60 80 / 47%);
  border-radius: 20px;
`

const PageLink = styled.div<{ isActive: boolean }>`
  margin: 0 5px;
  font-size: 20px;
  cursor: pointer;
  border-bottom: 3px solid
    ${({ isActive }) => (isActive ? '#b9393989' : 'transparent')};
  text-transform: uppercase;
  &:hover {
    color: wheat;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 7px;
    background-color: #030303;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(34 60 80);
    border-radius: 2em;
  }
`

export const Result = ({
  answers,
  setAnswers,
  setWords,
  setStatus,
}: IResultProps) => {
  const [active, setActive] = useState(ResultViews.RESULT)
  const audio = useMemo(() => new Audio(), [])

  const nextGame = useCallback(() => {
    setAnswers({ right: [], wrong: [], streak: 0, max: 0 })
    setWords([])
    setStatus(GameStatus.SELECT)
  }, [])
  return (
    <Wrapper>
      <WrapperRow>
        <PageLink
          isActive={active === ResultViews.RESULT}
          onClick={() => setActive(ResultViews.RESULT)}
        >
          {ResultViews.RESULT}
        </PageLink>
        <PageLink
          isActive={active === ResultViews.WORDS}
          onClick={() => setActive(ResultViews.WORDS)}
        >
          {ResultViews.WORDS}
        </PageLink>
      </WrapperRow>
      <Container>
        {active === ResultViews.RESULT ? (
          <ResultView
            right={answers.right.length}
            wrong={answers.wrong.length}
            nextGame={nextGame}
            setActive={setActive}
          />
        ) : (
          <>
            <WordList
              type={WordListType.MISTAKE}
              audio={audio}
              words={answers.wrong}
            />
            <WordList
              type={WordListType.SUCCESS}
              audio={audio}
              words={answers.right}
            />
          </>
        )}
      </Container>
    </Wrapper>
  )
}
