import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getFileResponse } from '../../../utils/config'
import { shuffle } from '../../../utils/utils'
import { AudioButton } from '../AudioButton'
import { Wrapper, WrapperRow } from '../Difficulty'
import { GameStatus, IAnswers, IGameRunProps } from '../types'

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

  const audio = useMemo(() => new Audio(), [])
  const generateAnswers = useMemo(
    () =>
      shuffle(
        Array.from(new Set([words[current], ...shuffle([...words])])).slice(
          0,
          5
        )
      ),
    [current, words]
  )

  const checkAnswer = useCallback(
    (id: string) => {
      if (id === words[current].id) answers.good.push(words[current])
      else answers.bad.push(words[current])
      setIsAnswered(true)
    },
    [current]
  )

  useEffect(() => {
    audio.pause()
    audio.src = getFileResponse(words[current].audio)
    audio.play()
  }, [current])

  const nextQuestion = useCallback(() => {
    if (current === words.length - 19) {
      setAnswers((prev) => ({ ...prev, ...answers }))
      setStatus(GameStatus.RESULT)
    } else {
      setCurrent((prev) => prev + 1)
      setIsAnswered(false)
    }
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
