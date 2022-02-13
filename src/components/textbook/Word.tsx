import parse from 'html-react-parser'
import React, { FC } from 'react'
import styled from 'styled-components'
import { BASE } from '../../utils/config'
import { AuthContext } from '../../utils/services'
import { IWordAddition, IWordObj, WordDifficultyType } from './types'

const Container = styled.div<{
  difficulty?: WordDifficultyType
  isDifficultGroup: boolean
}>`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 700px;
  flex-shrink: 0;
  background-color: #ffffff;
  color: #030303;
  border-top-left-radius: 160px;
  @media screen and (max-width: 420px) {
    width: 300px;
    border-top-left-radius: 120px;
  }
  & img {
    width: 100%;
    height: 200px;
    border-top-left-radius: 160px;
    border-bottom-right-radius: 160px;
    object-fit: cover;
    @media screen and (max-width: 420px) {
      border-top-left-radius: 120px;
      border-bottom-right-radius: 120px;
    }
  }
  & .description {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    flex-direction: column;
    row-gap: 5px;
    padding: 15px;
  }
  & h2 {
    font-size: 2.2em;
    letter-spacing: 1px;
  }
  & h3 {
    font-size: 1.2em;
  }
  & .buttons {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
    margin: 10px 0;
  }
  & .buttons button {
    border: none;
    border-radius: 5px;
    width: 175px;
    height: 26px;
    text-align: center;
    text-transform: uppercase;
    opacity: 0.8;
    transition: all ease 0.3s;
    cursor: pointer;
  }
  & .buttons button:hover {
    opacity: 1;
  }
  & .buttons .difficult {
    background-color: ${(props) =>
      props.difficulty === 'difficult' && !props.isDifficultGroup
        ? '#ccc;'
        : '#d651ff;'};
    pointer-events: ${(props) =>
      props.difficulty === 'difficult' && !props.isDifficultGroup
        ? 'none;'
        : 'auto;'};
  }
  & .buttons .studied {
    background-color: ${(props) =>
      props.difficulty === 'studied' ? '#ccc' : '#65c6ff;'};
    pointer-events: ${(props) =>
      props.difficulty === 'studied' ? 'none;' : 'auto;'};
  }
  & .explanation-title {
    font-size: 1.2em;
    letter-spacing: 1px;
  }
  & .explanation-example {
    font-size: 1em;
  }
`

const getProp = (e: React.MouseEvent<HTMLButtonElement>): IWordAddition => {
  return JSON.parse(e.currentTarget.dataset.prop || '')
}

const getButtonName = (isAdd: boolean) => {
  return isAdd ? 'Добавить в сложные' : 'Удалить из сложных'
}

export const Word: FC<IWordObj> = ({
  word,
  difficulty,
  deleteDifficulty,
  state,
}) => {
  const { isAuth } = React.useContext(AuthContext)
  const difficultyListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const checkWord = getProp(e)
    difficulty(checkWord)
  }

  const deleteDifficultyListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const checkWord = getProp(e)
    deleteDifficulty(checkWord.id)
  }

  const buttonDifficulty = (name: WordDifficultyType, child: string) => {
    if (isAuth) {
      return (
        <button
          className={name}
          type="button"
          data-prop={JSON.stringify({
            id: word.id,
            difficulty: name,
            isNew: word.userWord ? !!word.userWord.difficulty : false,
          })}
          onClick={
            state.counter.currentGroup < 6
              ? difficultyListener
              : deleteDifficultyListener
          }
        >
          {child}
        </button>
      )
    }
    return ''
  }

  if (!word) {
    return null
  }
  return (
    <Container
      difficulty={word.userWord ? word.userWord.difficulty : undefined}
      isDifficultGroup={state.counter.currentGroup === 6}
    >
      <img src={BASE + word.image} alt={word.word} className="word_image" />
      <div className="description">
        <h2>{word.word}</h2>
        <h3>{word.wordTranslate}</h3>
        <h3>
          {word.transcription}
          <button type="button">Vollume</button>
        </h3>
        <div className="buttons">
          {buttonDifficulty(
            'difficult',
            getButtonName(state.counter.currentGroup < 6)
          )}
          {buttonDifficulty('studied', 'Добавить в изученые')}
        </div>
        <p className="explanation-title">Значение</p>
        <p className="explanation-example">{parse(word.textMeaning)}</p>
        <p className="explanation-example">{word.textMeaningTranslate}</p>
        <p className="explanation-title">Пример</p>
        <p className="explanation-example">{parse(word.textExample)}</p>
        <p className="explanation-example">{word.textExampleTranslate}</p>
      </div>
    </Container>
  )
}
