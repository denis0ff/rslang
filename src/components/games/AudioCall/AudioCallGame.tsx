import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getFileResponse } from '../../../utils/config'
import { AuthContext } from '../../../utils/services'
import { shuffle } from '../../../utils/utils'
import { AudioButton } from '../AudioButton'
import { Wrapper, WrapperRow } from '../Difficulty'
import { GameStatus, GameTypeOption, IGameRunProps } from '../types'
import { addWord, addWordStat } from '../utils'

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

const keys = ['1', '2', '3', '4', '5']

let variables: string[] = []

export const AudioCallGame = ({
  words,
  answers,
  setStatus,
  setAnswers,
}: IGameRunProps) => {
  const [current, setCurrent] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const isAuth = useContext(AuthContext)

  const audio = useMemo(() => new Audio(), [])

  const generatedAnswers = useMemo(() => {
    const newArray = shuffle(
      Array.from(new Set([words[current], ...shuffle([...words])])).slice(0, 5)
    )
    variables = newArray.map((i) => i.id)
    return newArray
  }, [current, words])

  const checkAnswer = useCallback(
    (id: string) => {
      const isRight = id === words[current].id
      if (isRight)
        setAnswers((prev) => ({
          ...prev,
          ...{
            right: [...prev.right, words[current]],
            streak: prev.streak + 1,
          },
        }))
      else {
        setAnswers((prev) => ({
          ...prev,
          ...{
            wrong: [...prev.wrong, words[current]],
            max: prev.max < prev.streak ? prev.streak : prev.max,
            streak: 0,
          },
        }))
      }
      if (isAuth)
        addWord({
          isRight,
          id: words[current].id,
          gameType: GameTypeOption.AUDIO_CALL,
        })
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
    if (current === words.length - 1) {
      if (isAuth) addWordStat({ answers, gameType: GameTypeOption.AUDIO_CALL })
      setStatus(GameStatus.RESULT)
    } else {
      setCurrent((prev) => prev + 1)
      setIsAnswered(false)
    }
  }, [isAnswered])

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.key === ' ') {
        if (isAnswered) nextQuestion()
        else checkAnswer('')
      }
      if (keys.includes(e.key) && !isAnswered) {
        checkAnswer(variables[+e.key])
      }
    }

    document.addEventListener('keydown', onKeydown)

    return () => {
      document.removeEventListener('keydown', onKeydown)
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
        {generatedAnswers.map((w) => (
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
