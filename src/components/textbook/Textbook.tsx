import React, { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ITextbook, ITextbookMethods, TPColors } from './textbookTypes'
import { Paging } from './Paging'
import { Section, SectionDifficult } from './Section'
import { WordlistItem } from './WordlistItem'
import { Word } from './Word'
import { AuthContext } from '../../utils/services'
import { sections } from './textbookConfig'
import { IWord, Paths, WordDifficulties } from '../../utils/types'
import { Container } from '../ui/elements'

const Wrapper = styled.div`
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

const Words = styled.div<{ isStudied: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  background-color: ${(prop) =>
    prop.isStudied ? TPColors.STUDIED : TPColors.STUDY}
  padding: 15px;
  border-radius: 5px;
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

const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 750px;
  flex-shrink: 0;
  background-color: #ffffff;
  color: #030303;
  border-radius: 5px;
  border-top-left-radius: 160px;
  @media screen and (max-width: 470px) {
    width: 250px;
    border-top-left-radius: 120px;
    height: auto;
  }
`

const Games = styled.div<{
  active: boolean
}>`
  display: flex;
  width: 100%;
  padding: 5px 15px;
  column-gap: 10px;
  row-gap: 10px;
  & .game {
    display: inline-flex;
    border: none;
    border-radius: 5px;
    width: 175px;
    height: 26px;
    padding: 0;
    line-height: 26px;
    justify-content: center;
    text-transform: uppercase;
    opacity: 0.8;
    transition: all ease 0.3s;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: 1px;
    font-family: inherit;
    background-color: ${(props) => (props.active ? '#ccc;' : '#b3065c;')};
    pointer-events: ${(props) => (props.active ? 'none;' : 'auto;')};
    :hover {
      opacity: 1;
    }
  }
  @media screen and (max-width: 470px) {
    flex-direction: column;
  }
`

export const Textbook: FC<{
  state: ITextbook
  methods: ITextbookMethods
}> = ({ state, methods }) => {
  const { isAuth } = React.useContext(AuthContext)
  const currentWord = methods.getCurrentWord()
  const markPages = methods.getMarkPages(state.counter.currentGroup)

  const chankWords = React.useMemo(
    () =>
      ((): IWord[] => {
        const res = state.words.filter((word) => {
          const f = state.aggrWords.find((el) => el._id === word.id)
          return (
            (f &&
              f.userWord &&
              f.userWord.difficulty !== WordDifficulties.STUDIED) ||
            !f
          )
        }) as IWord[]
        return res
      })(),
    [state.words, state.aggrWords]
  )

  const vocabulary = () => {
    if (isAuth) {
      return (
        <>
          <TitlePath>Мой словарь</TitlePath>
          <div className="sections sections-vocabulary">
            <SectionDifficult
              key="D"
              name="Difficult"
              count={state.counter.difficultWordsCount}
              ind={6}
              checked={state.counter.currentGroup === 6}
              callback={methods.groupDifficultEvent}
            />
          </div>
        </>
      )
    }
    return ''
  }

  const createPaging = () => {
    if (state.counter.currentGroup < 6)
      return (
        <Paging
          current={methods.getCurrentPage()}
          total={state.counter.countPage}
          markPages={markPages}
          callback={methods.pagingEvent}
        />
      )
    return ''
  }

  return (
    <Container>
      <Wrapper>
        <Title>Электронный учебник</Title>
        <TitlePath>Разделы сложности слов</TitlePath>
        <Sections>
          {sections.map((item, ind) => {
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
        {vocabulary()}
        <Title>Слова</Title>
        {(() => {
          if (state.words.length > 0) {
            return (
              <Words
                isStudied={state.words.every((item) => {
                  const f = state.aggrWords.find((el) => item.id === el._id)
                  return (
                    f &&
                    f.userWord &&
                    item.id === f._id &&
                    (f.userWord.difficulty === WordDifficulties.DIFFICULT ||
                      f.userWord.difficulty === WordDifficulties.STUDIED)
                  )
                })}
              >
                <WordList>
                  {state.words.map((item, ind) => {
                    return (
                      <WordlistItem
                        key={item.id}
                        state={state}
                        ind={ind}
                        active={item.id === currentWord.id}
                        word={item}
                        label={(() => {
                          const res = state.aggrWords.find(
                            (el) => el._id === item.id
                          )
                          return res && res.userWord
                            ? res.userWord.difficulty
                            : undefined
                        })()}
                        callback={methods.wordEvent}
                      />
                    )
                  })}
                </WordList>
                {(() => {
                  if (state.words[state.counter.currentWord]) {
                    return (
                      <WordContainer>
                        <Word
                          word={methods.getCurrentWord()}
                          difficulty={methods.difficultyWordEvent}
                          deleteDifficulty={methods.deleteDifficultyWordEvent}
                          state={state}
                        />
                        {(() => {
                          if (state.counter.currentGroup < 6)
                            return (
                              <Games
                                active={
                                  markPages[
                                    state.counter.currentPage[
                                      state.counter.currentGroup
                                    ] - 1
                                  ] && state.counter.currentGroup < 6
                                }
                              >
                                <Link
                                  to={`../${Paths.AUDIO_CALL}`}
                                  className="game"
                                  state={chankWords}
                                >
                                  Аудиовызов
                                </Link>
                                <Link
                                  to={`../${Paths.SPRINT}`}
                                  className="game"
                                  state={chankWords}
                                >
                                  Спринт
                                </Link>
                              </Games>
                            )
                          return null
                        })()}
                      </WordContainer>
                    )
                  }
                  return null
                })()}
              </Words>
            )
          }
          return null
        })()}
        {createPaging()}
      </Wrapper>
    </Container>
  )
}
