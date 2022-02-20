import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { WrapperRow } from '../Difficulty'
import { GameStatus, IResultProps, ResultViews, WordListType } from '../types'
import { ResultView } from './ResultView'
import { WordList } from './WordList'

const Wrapper = styled.div`
  margin-top: 5rem;
  padding: 1em;
  max-width: 500px;
  width: 90%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  gap: 0.5em;
  background-color: #0e0e0e;
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
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
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
