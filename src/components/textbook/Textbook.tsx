import React, { FC } from 'react'
import styled from 'styled-components'
import { ITextbook, ITextbookMethods } from './types'
import { Paging } from './Paging'
import { Section, SectionDifficult } from './Section'
import './Textbook.css'
import { WordlistItem } from './WordlistItem'
import { Word } from './Word'
import { AuthContext } from '../../utils/services'

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

const vocabulary = (isAuth: boolean) => {
  // const authorize = !!localStorage.getItem('token')
  if (isAuth) {
    return (
      <>
        <TitlePath>Мой словарь</TitlePath>
        <div className="sections sections-vocabulary">
          <SectionDifficult
            key="D"
            name="Difficult"
            count={0}
            ind={7}
            callback={() => {}}
          />
        </div>
      </>
    )
  }
  return ''
}

export const Textbook: FC<{
  state: ITextbook
  methods: ITextbookMethods
}> = ({ state, methods }) => {
  const { isAuth } = React.useContext(AuthContext)
  const currentWord = methods.getCurrentWord()

  return (
    <Container>
      <Title>Электронный учебник</Title>
      <TitlePath>Разделы сложности слов</TitlePath>
      <Sections>
        {state.sections.map((item, ind) => {
          return (
            <Section
              key={item.code}
              name={item.name}
              code={item.code}
              first={item.first}
              last={item.last}
              ind={ind}
              checked={ind === state.counter.currentGroup}
              callback={methods.groupEvent}
            />
          )
        })}
      </Sections>
      {vocabulary(isAuth)}
      <Title>Слова</Title>
      <Words>
        <WordList>
          {state.words.map((item, ind) => {
            return (
              <WordlistItem
                key={item.id}
                ind={ind}
                active={item.id === currentWord.id}
                word={item.word}
                trans={item.wordTranslate}
                label={item.userWord ? item.userWord.difficulty : 'all'}
                callback={methods.wordEvent}
              />
            )
          })}
        </WordList>
        <Word
          word={methods.getCurrentWord()}
          difficultCallback={methods.addDifficultWordEvent}
          studiedCallback={methods.addStudiedWordEvent}
        />
      </Words>
      <Paging
        current={methods.getCurrentPage()}
        total={state.counter.countPage}
        callback={methods.pagingEvent}
      />
    </Container>
  )
}
