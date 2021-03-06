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
  const [isStart, setIsStart] = useState(true)

  const getNewWords = useCallback(async () => {
    const arrowWords = await getWordsPromise(words[0].group, words[0].page - 1)
    const { data } = arrowWords
    setWords((prev) => [...prev, ...data].slice(0, MIN_GAME_LENGTH))
  }, [])

  useEffect(() => {
    if (words.length >= MIN_GAME_LENGTH) setIsStart(false)
    else if (words[0].page === 0) setStatus(GameStatus.ERROR)
    else getNewWords()
  }, [type, words])

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
