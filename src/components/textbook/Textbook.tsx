import { FC } from 'react'
import styled from 'styled-components'
import { ITextbook, ITextbookMethods } from './types'
import { Paging } from './Paging'
import { Section } from './Section'
import './Textbook.css'
import { WordlistItem } from './WordlistItem'
import { Word } from './Word'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Sections = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
`

const Title = styled.div`
  margin: 10px 0 0 0;
  font-size: 2em;
`

const TitlePath = styled.div`
  margin: 10px 0;
  font-size: 1.2em;
`

const Words = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  @media screen and (max-width: 640px) {
    flex-wrap: wrap-reverse;
    justify-content: center;
  }
`

const WordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 1;
  column-gap: 15px;
  row-gap: 30px;
  align-content: flex-start;
  @media screen and (max-width: 640px) {
    justify-content: center;
  }
`

const vocabulary = () => {
  const authorize = 1
  if (authorize === 1) {
    return (
      <>
        <TitlePath>Мой словарь</TitlePath>
        <div className="sections sections-vocabulary">
          <Section key="D" name="Difficult" first={0} />
        </div>
      </>
    )
  }
  return ''
}

export const Textbook: FC<{
  state: ITextbook
  setState: (item: ITextbook) => void
  methods: ITextbookMethods
}> = ({ state, setState, methods }) => {
  return (
    <Container>
      <Title>Электронный учебник</Title>
      <TitlePath>Разделы сложности слов</TitlePath>
      <Sections>
        {state.sections.map((item) => {
          return (
            <Section
              key={item.code}
              name={item.name}
              code={item.code}
              first={item.first}
              last={item.last}
            />
          )
        })}
      </Sections>
      {vocabulary()}
      <Title>Слова</Title>
      <Words>
        <WordList>
          {state.words.map((item) => {
            return (
              <WordlistItem
                key={item.id}
                word={item.word}
                trans={item.wordTranslate}
              />
            )
          })}
        </WordList>
        <Word word={methods.getCurrentWord()} />
      </Words>
      <Paging
        current={methods.getCurrentPage()}
        total={state.counter.countPage}
        callback={methods.pagingEvent}
      />
    </Container>
  )
}
