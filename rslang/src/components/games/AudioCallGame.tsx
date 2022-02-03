import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { getFileResponse } from '../../utils/config'
import { IGameRunProps, IWord } from '../../utils/types'
import { Wrapper, WrapperRow } from './Difficulty'
import Icon from '../../assets/audio-play.svg'

const AudioButton = styled.button``

const StyledIcon = styled(Icon)``

const AnswerButton = styled.button``

const ShowAnswer = styled.button``

const shuffle = (array: IWord[]) => {
  console.log(array[0].id)

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const AudioCallGame = ({ words }: IGameRunProps) => {
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState(words[0].id)
  const audio = new Audio(getFileResponse(words[0].audio))

  const generateAnswers = useCallback(
    () =>
      shuffle(
        Array.from(new Set([words[current], ...shuffle(words)])).slice(0, 5)
      ),
    [current, words]
  )

  const checkAnswer = useCallback(
    (id: string) => {
      console.log(id === answer)
      setCurrent((prev) => prev + 1)
      setAnswer(words[current].id)
      audio.src = getFileResponse(words[current].audio)
    },
    [answer, current, words]
  )

  return (
    <Wrapper>
      <AudioButton onClick={() => audio.play()} />
      <WrapperRow>
        {generateAnswers().map((w) => (
          <AnswerButton key={w.id} onClick={() => checkAnswer(w.id)}>
            {w.wordTranslate}
          </AnswerButton>
        ))}
      </WrapperRow>
      <ShowAnswer />
    </Wrapper>
  )
}
