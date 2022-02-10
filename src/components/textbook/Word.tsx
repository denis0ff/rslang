import parse from 'html-react-parser'
import { FC } from 'react'
import styled from 'styled-components'
import { BASE } from '../../utils/config'
import { IWordObj } from './types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: fit-content;
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
    margin: 10px 0;
  }
  & .buttons .difficult {
    background-color: #ff5500;
  }
  & .buttons .studied {
    background-color: #00aaff;
  }
  & .explanation-title {
    font-size: 1.2em;
    letter-spacing: 1px;
  }
  & .explanation-example {
    font-size: 1em;
  }
`

export const Word: FC<IWordObj> = ({ word }) => {
  if (!word) {
    return null
  }
  return (
    <Container>
      <img src={BASE + word.image} alt={word.word} className="word_image" />
      <div className="description">
        <h2>{word.word}</h2>
        <h3>{word.wordTranslate}</h3>
        <h3>
          {word.transcription}
          <button type="button">Vollume</button>
        </h3>
        <div className="buttons">
          <button className="difficult" type="button">
            + В СЛОЖНЫЕ СЛОВА
          </button>
          <button className="studied" type="button">
            ИЗУЧЕННОЕ СЛОВО
          </button>
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
