import { useCallback } from 'react'
import styled from 'styled-components'
import { Paths } from '../../utils/types'
import { WrapperRow } from './Difficulty'
import { Wrapper } from './Result/Result'
import { GameLink, TextbookLink } from './Result/ResultView'
import { GameStatus, IGameErrorProps } from './types'

const Title = styled.h3`
  padding: 5em 2em;
  text-align: center;
`

export const NotEnoughWords = ({ setStatus, setWords }: IGameErrorProps) => {
  const newGame = useCallback(() => {
    setWords([])
    setStatus(GameStatus.SELECT)
  }, [])
  return (
    <Wrapper>
      <Title>
        Извините, для начала игры недостаточно слов. Попробуйте запустить другую
        игру
      </Title>
      <WrapperRow>
        <GameLink onClick={newGame}>Сыграть ещё раз</GameLink>
        <TextbookLink to={`../${Paths.TEXTBOOK}`}>
          Перейти в учебник
        </TextbookLink>
      </WrapperRow>
    </Wrapper>
  )
}
