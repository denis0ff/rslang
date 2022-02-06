import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Wrapper, WrapperRow } from '../Difficulty'
import { IResultProps, ResultViews, WordListType } from '../types'
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

export const Result = ({ answers, setStatus }: IResultProps) => {
  const [active, setActive] = useState(ResultViews.RESULT)
  const audio = useMemo(() => new Audio(), [])
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
            good={answers.good.length}
            bad={answers.bad.length}
            setStatus={setStatus}
          />
        ) : (
          <>
            <WordList
              type={WordListType.MISTAKE}
              audio={audio}
              words={answers.bad}
            />
            <WordList
              type={WordListType.SUCCESS}
              audio={audio}
              words={answers.good}
            />
          </>
        )}
      </Container>
    </Wrapper>
  )
}
