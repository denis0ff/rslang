import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getFileResponse } from '../../../utils/config'
import { AuthContext } from '../../../utils/services'
import { shuffle } from '../../../utils/utils'
import { AudioButton } from '../AudioButton'
import { Button, Wrapper, WrapperRow } from '../Difficulty'
import { GameStatus, GameTypeOption, IGameRunProps } from '../types'
import { addWord, addWordStat } from '../utils'

const AnswerContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  min-width: calc(390px + 5em);
  min-height: calc(260px + 5em);
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
`

const AnswerImg = styled.div<{ img: string; isRight: boolean }>`
  width: 390px;
  height: 260px;
  border-radius: 160px 0 160px 5px;
  background: center / cover no-repeat ${(props) => `url(${props.img})`};
  box-shadow: 5px 5px 50px 5px
    ${({ isRight }) => (isRight ? '#35c77e89' : '#b9393989')};
`

const AnswerButton = styled(Button)<{ isRight: boolean; isAnswered: boolean }>`
  padding: 0.4em 0.8em;
  background-color: ${({ isRight, isAnswered }) => {
    if (isAnswered) return isRight ? '#35c77e89' : '#b9393989'
    return 'transparent'
  }};
  color: inherit;
`

const keys = ['1', '2', '3', '4', '5']

export const AudioCallGame = ({
  words,
  answers,
  setStatus,
  setAnswers,
}: IGameRunProps) => {
  const [current, setCurrent] = useState(0)
  const [variables, setVariables] = useState<string[]>([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [isRight, setIsRight] = useState(false)

  const { isAuth } = useContext(AuthContext)

  const audio = useMemo(() => new Audio(), [])

  const generatedAnswers = useMemo(() => {
    const newArray = shuffle(
      Array.from(new Set([words[current], ...shuffle([...words])])).slice(0, 5)
    )
    setVariables(newArray.map((i) => i.id))
    return newArray
  }, [current, words])

  const checkAnswer = useCallback(
    (id: string) => {
      const currentIsRight = id === words[current].id
      setIsRight(currentIsRight)
      if (currentIsRight)
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
          isRight: currentIsRight,
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
        checkAnswer(variables[+e.key - 1])
      }
      if (e.key === 'Enter') {
        audio.play()
      }
    }

    document.addEventListener('keydown', onKeydown)

    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [isAnswered])

  return (
    <Wrapper>
      <AnswerContainer>
        {isAnswered ? (
          <>
            <AnswerImg
              img={getFileResponse(words[current].image)}
              isRight={isRight}
            />
            <Container>
              {words[current].word}
              <AudioButton audio={audio} />
            </Container>
          </>
        ) : (
          <AudioButton audio={audio} />
        )}
      </AnswerContainer>
      <WrapperRow>
        {generatedAnswers.map((w) => (
          <AnswerButton
            key={w.id}
            isRight={w.id === words[current].id}
            isAnswered={isAnswered}
            onClick={() => {
              if (!isAnswered) checkAnswer(w.id)
            }}
          >
            {w.wordTranslate}
          </AnswerButton>
        ))}
      </WrapperRow>
      <Button onClick={() => (isAnswered ? nextQuestion() : checkAnswer(''))}>
        {isAnswered ? 'Следующий' : 'Не знаю'}
      </Button>
    </Wrapper>
  )
}
