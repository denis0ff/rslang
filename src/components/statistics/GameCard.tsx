import styled from 'styled-components'
import { checkIsNaN } from '../../utils/utils'
import { IGameCardProps } from './types'
import { Title } from './WordStats'

const Article = styled.article`
  padding: 2em;
  box-shadow: 0px 8px 40px 20px rgb(34 60 80 / 47%);
`

const ListItem = styled.li`
  padding: 0.5em 0;
`

export const GameCard = ({ game, type }: IGameCardProps) => {
  return (
    <Article>
      <Title>{type}</Title>
      <ul>
        <ListItem>Новых слов: {game.newWords}</ListItem>
        <ListItem>
          Правильных ответов:{' '}
          {(checkIsNaN(game.right / game.allWords) * 100).toFixed(0)}%
        </ListItem>
        <ListItem>
          Самая длинная серия правильных ответов: {game.streak}
        </ListItem>
      </ul>
    </Article>
  )
}
