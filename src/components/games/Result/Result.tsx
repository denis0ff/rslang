import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Wrapper, WrapperRow } from '../Difficulty'
import { GameStatus, IResultProps, ResultViews, WordListType } from '../types'
import { ResultView } from './ResultView'
import { WordList } from './WordList'

const PageLink = styled.div``

const Container = styled.div`
  width: 60vw;
  height: 80vh;
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
        <PageLink onClick={() => setActive(ResultViews.RESULT)}>
          {ResultViews.RESULT}
        </PageLink>
        <PageLink onClick={() => setActive(ResultViews.WORDS)}>
          {ResultViews.WORDS}
        </PageLink>
      </WrapperRow>
      <Container>
        {active === ResultViews.RESULT ? (
          <ResultView
            right={answers.right.length}
            wrong={answers.wrong.length}
            nextGame={nextGame}
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
