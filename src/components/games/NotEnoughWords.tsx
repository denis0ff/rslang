import { useCallback } from 'react'
import { Paths } from '../../utils/types'
import { Container, WrapperRow } from './Difficulty'
import { GameLink, TextbookLink, TextLink } from './Result/ResultView'
import { GameStatus, IGameErrorProps } from './types'

export const NotEnoughWords = ({ setStatus, setWords }: IGameErrorProps) => {
  const newGame = useCallback(() => {
    setWords([])
    setStatus(GameStatus.SELECT)
  }, [])
  return (
    <Container>
      <TextLink>
        Извините, для начала игры недостаточно слов. Попробуйте запустить другую
        игру
      </TextLink>
      <WrapperRow>
        <GameLink onClick={newGame}>Сыграть ещё раз</GameLink>
        <TextbookLink to={`../${Paths.TEXTBOOK}`}>
          Перейти в учебник
        </TextbookLink>
      </WrapperRow>
    </Container>
  )
}
