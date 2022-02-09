import { FC } from 'react'
import styled from 'styled-components'
import { ITextbook, ITextbookMethods } from './types'
import { Paging } from './Paging'
import { Section } from './Section'
import './Textbook.css'
import { WordlistItem } from './WordlistItem'
import { Word } from './Word'

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
    <div className="container">
      <Title>Электронный учебник</Title>
      <TitlePath>Разделы сложности слов</TitlePath>
      <div className="sections">
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
      </div>
      {vocabulary()}
      <Title>Слова</Title>
      <Words>
        <WordList>
          <WordlistItem
            word="straightforward"
            trans="находящихся под угрозой исчезновения"
          />
        </WordList>
        <Word />
      </Words>
      <Paging
        current={state.pageCounter.currentPage}
        total={state.pageCounter.countPage}
        callback={methods.pagingEvent}
      />
    </div>
  )
}
