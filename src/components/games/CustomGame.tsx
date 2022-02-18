import { useCallback, useEffect, useState } from 'react'
import { getWordsPromise } from '../../utils/services'
import { AudioCallDescription } from './AudioCall/AudioCallDescription'
import { Button, Container, Description } from './Difficulty'
import { SprintDescription } from './Sprint/SprintDescription'
import { GameStatus, GameType, IDifficultyProps } from './types'

export const MIN_GAME_LENGTH = 10

export const CustomGame = ({
  type,
  words,
  setWords,
  setStatus,
}: IDifficultyProps) => {
  const [isStart, setIsStart] = useState(false)

  const getNewWords = useCallback(async () => {
    const arrowWords = await getWordsPromise(words[0].group, words[0].page)
    const { data } = arrowWords
    setWords((prev) => [...prev, ...data].slice(0, 9))
  }, [])

  useEffect(() => {
    if (words.length >= MIN_GAME_LENGTH) setIsStart(true)
    else if (words[0].page === 0) {
      setStatus(GameStatus.ERROR)
    } else getNewWords()
  }, [words])

  return (
    <Container>
      <Description>
        {type === GameType.AUDIO_CALL ? (
          <AudioCallDescription />
        ) : (
          <SprintDescription />
        )}
      </Description>
      <Button disabled={isStart} onClick={() => setStatus(GameStatus.GAME)}>
        Начать
      </Button>
    </Container>
  )
}
