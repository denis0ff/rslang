import { useState } from 'react'
import styled from 'styled-components'
import { getFileResponse } from '../../utils/config'
import { IResultProps } from '../../utils/types'
import { AudioButton } from './AudioButton'
import { Wrapper, WrapperRow } from './Difficulty'

const PageLink = styled.div`
  width: 50%;
`

const List = styled.ul``

const TextLink = styled.p``

const Button = styled.button``

const Word = styled.p``

const WordTranslate = styled.span``

export const Result = ({ answers, setGame }: IResultProps) => {
  const [active, setActive] = useState('result')
  const audio = new Audio()
  return (
    <Wrapper>
      <WrapperRow>
        <PageLink>Результат</PageLink>
        <PageLink>Посмотреть мои слова</PageLink>
      </WrapperRow>
      {active === 'result' ? (
        <>
          <Title>Ты молодец!</Title>
          <TextLink>
            {answers.good.length} изучено, {answers.bad.length} на изучении
          </TextLink>
          <div>
            <Button onClick={() => setGame({ status: 'select' })}>
              Сыграть ещё раз
            </Button>
            <Button>Перейти в учебник</Button>
          </div>
        </>
      ) : (
        <>
          <List>
            Ошибок <span>{answers.bad.length}</span>
            {answers.bad.map((a) => (
              <>
                <AudioButton audio={audio} src={getFileResponse(a.audio)} />
                <Word>
                  {a.word}
                  <WordTranslate>{a.wordTranslate}</WordTranslate>
                </Word>
              </>
            ))}
          </List>
        </>
      )}
    </Wrapper>
  )
}
