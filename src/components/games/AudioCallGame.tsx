import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getFileResponse } from '../../utils/config'
import { IAnswers, IGameRunProps } from '../../utils/types'
import { Wrapper, WrapperRow } from './Difficulty'
import { shuffle } from '../../utils/utils'
import { AudioButton } from './AudioButton'

const AnswerContainer = styled.div``

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
`

const AnswerImg = styled.div<{ img: string }>`
  width: 30rem;
  height: 30rem;
  background: center / cover no-repeat ${(props) => `url(${props.img})`};
`

const AnswerButton = styled.button``

const ShowAnswer = styled.button``

const answers: IAnswers = { good: [], bad: [] }

export const AudioCallGame = ({ words, setGame }: IGameRunProps) => {
  const [current, setCurrent] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)

  const audio = new Audio(getFileResponse(words[0].audio))

  const generateAnswers = useMemo(
    () =>
      shuffle(
        Array.from(new Set([words[current], ...shuffle(words)])).slice(0, 5)
      ),
    [current]
  )

  const checkAnswer = useCallback(
    (id: string) => {
      id === words[current].id
        ? answers.good.push(words[current])
        : answers.bad.push(words[current])
      console.log(answers)
      setIsAnswered(true)
    },
    [current]
  )

  const nextQuestion = useCallback(() => {
    if (current === words.length - 17) setGame({ status: 'result', answers })
    setCurrent((prev) => prev + 1)
    setIsAnswered(false)
    audio.pause()
    audio.src = getFileResponse(words[current].audio)
  }, [isAnswered])

  return (
    <Wrapper>
      {isAnswered ? (
        <AnswerContainer>
          <AnswerImg img={getFileResponse(words[current].image)} />
          <Container>
            {words[current].word}
            <AudioButton audio={audio} />
          </Container>
        </AnswerContainer>
      ) : (
        <AudioButton audio={audio} />
      )}
      <WrapperRow>
        {generateAnswers.map((w) => (
          <AnswerButton
            key={w.id}
            onClick={() => {
              if (!isAnswered) checkAnswer(w.id)
            }}
          >
            {w.wordTranslate}
          </AnswerButton>
        ))}
      </WrapperRow>
      <ShowAnswer
        onClick={() => (isAnswered ? nextQuestion() : checkAnswer(''))}
      >
        {isAnswered ? 'Следующий' : 'Не знаю'}
      </ShowAnswer>
    </Wrapper>
  )
}
