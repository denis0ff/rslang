import styled from 'styled-components'
import { Title } from '../../../pages/NotFound'
import { GameStatus, IResultViewProps } from '../types'

const TextLink = styled.p``

const Button = styled.button``

export const ResultView = ({ good, bad, setStatus }: IResultViewProps) => (
  <>
    <Title>Ты молодец!</Title>
    <TextLink>
      {good} изучено, {bad} на изучении
    </TextLink>
    <div>
      <Button onClick={() => setStatus(GameStatus.SELECT)}>
        Сыграть ещё раз
      </Button>
      <Button>Перейти в учебник</Button>
    </div>
  </>
)
