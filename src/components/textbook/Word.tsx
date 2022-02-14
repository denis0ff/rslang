import { FC } from 'react'
import styled from 'styled-components'
import Pic from '../../assets/1.jpg'
import { IWordObj } from './types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: fit-content;
  flex-shrink: 0;
  background-color: #ffffff;
  color: #030303;
  @media screen and (max-width: 420px) {
    width: 300px;
  }
  & img {
    width: 100%;
    height: 200px;
    object-fit: cover;
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
    font-size: 0.9em;
  }
`

export const Word: FC<IWordObj> = ({ word }) => {
  return (
    <Container>
      <img src={Pic} alt="pic" className="word_image" />
      <div className="description">
        <h2>straightforward</h2>
        <h3>находящихся под угрозой исчезновения</h3>
        <h3>
          транскрипция
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
        <p className="explanation-example">
          АВИБМЛАОАОАО ООАОАОАОАО ВЛВЛВЛВЛ ВОВОВОВАВИБМЛАОАОАО ООАОАОАОАО
          ВЛВЛВЛВЛ ВОВОВОВ
        </p>
        <p className="explanation-example">
          АВИБМЛАОАОАО ООАОАОАОАО ВЛВЛВЛВЛ ВОВОВОВАВИБМЛАОАОАО ООАОАОАОАО
          ВЛВЛВЛВЛ ВОВОВОВ
        </p>
        <p className="explanation-title">Пример</p>
        <p className="explanation-example">
          АВИБМЛАОАОАО ООАОАОАОАО ВЛВЛВЛВЛ ВОВОВОВ
        </p>
        <p className="explanation-example">
          Tckb rnj-nj nheljk.,bd jy vnj-nj nheljk.,bd jyjuj hf,jnftn
        </p>
      </div>
    </Container>
  )
}
