import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getFileResponse } from '../../../utils/config'
import { shuffle } from '../../../utils/utils'
import { AudioButton } from '../AudioButton'
import { Wrapper, WrapperRow } from '../Difficulty'
import { IAnswers, IGameRunProps } from '../types'

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

export const AudioCallGame = ({
  words,
  setStatus,
  setAnswers,
}: IGameRunProps) => {
  const [current, setCurrent] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)

  const audio = new Audio()

  const generateAnswers = useMemo(
    () =>
      shuffle(
        Array.from(
          new Set([words.chunk[current], ...shuffle(words.chunk)])
        ).slice(0, 5)
      ),
    [current, words.chunk]
  )

  const checkAnswer = useCallback(
    (id: string) => {
      if (id === words.chunk[current].id)
        answers.good.push(words.chunk[current])
      else answers.bad.push(words.chunk[current])
      setIsAnswered(true)
    },
    [current, words.chunk]
  )

  const changeAudioSrc = useCallback(() => {
    audio.pause()
    audio.src = getFileResponse(words.chunk[current].audio)
  }, [audio, current, words.chunk])

  const nextQuestion = useCallback(() => {
    if (current === words.chunk.length - 1) {
      setAnswers((prev) => ({ ...prev, ...answers }))
      setStatus('result')
    } else {
      setCurrent((prev) => prev + 1)
      setIsAnswered(false)
      changeAudioSrc()
    }
  }, [current, setAnswers, setStatus, words.chunk])

  return (
    <Wrapper>
      {isAnswered ? (
        <AnswerContainer>
          <AnswerImg img={getFileResponse(words.chunk[current].image)} />
          <Container>
            {words.chunk[current].word}
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
