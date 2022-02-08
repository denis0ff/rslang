import React, { FC } from 'react'
import { ISection, ITextbook, ITextbookMethods } from './types'
import './Textbook.css'
import Pic from '../../assets/1.jpg'
import { Paging } from './Paging'
import { getProp } from './utils'

const sectionListener = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  const data = getProp(e)
  console.log(data)
}

const Section: FC<ISection> = ({ name, code, first, last }) => {
  const prop = JSON.stringify({ code })

  return (
    <button
      type="button"
      onClick={sectionListener}
      className="section"
      data-prop={prop}
    >
      <div className="section-title">
        <h2>{name}</h2>
        <p>{last ? `${first}-${last}` : first}</p>
      </div>
      <div className="section-code">{code}</div>
    </button>
  )
}

const vocabulary = () => {
  const authorize = 1
  if (authorize === 1) {
    return (
      <>
        <div className="title-path">Мой словарь</div>
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
      <div className="title">Электронный учебник</div>
      <div className="title-path">Разделы сложности слов</div>
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
      <div className="title">Слова</div>
      <div className="words">
        <div className="wordlist">
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
          <div className="wordlist-item">
            <h2>straightforward</h2>
            <p>находящихся под угрозой исчезновения</p>
          </div>
        </div>
        <div className="word">
          <img src={Pic} alt="pic" className="word_image" />
          <div className="word_description">
            <h2>straightforward</h2>
            <h3>находящихся под угрозой исчезновения</h3>
            <h3>
              транскрипция
              <button type="button">Vollume</button>
            </h3>
            <div className="word_buttons">
              <button type="button">+ В СЛОЖНЫЕ СЛОВА</button>
              <button type="button">ИЗУЧЕННОЕ СЛОВО</button>
            </div>
            <p className="word_explanation-title">Значение</p>
            <p className="word_explanation-example">
              АВИБМЛАОАОАО ООАОАОАОАО ВЛВЛВЛВЛ ВОВОВОВАВИБМЛАОАОАО ООАОАОАОАО
              ВЛВЛВЛВЛ ВОВОВОВ
            </p>
            <p className="word_explanation-example">
              АВИБМЛАОАОАО ООАОАОАОАО ВЛВЛВЛВЛ ВОВОВОВАВИБМЛАОАОАО ООАОАОАОАО
              ВЛВЛВЛВЛ ВОВОВОВ
            </p>
            <p className="word_explanation-title">Пример</p>
            <p className="word_explanation-example">
              АВИБМЛАОАОАО ООАОАОАОАО ВЛВЛВЛВЛ ВОВОВОВ
            </p>
            <p className="word_explanation-example">
              Tckb rnj-nj nheljk.,bd jy vnj-nj nheljk.,bd jyjuj hf,jnftn
            </p>
          </div>
        </div>
      </div>
      <Paging
        current={state.pageCounter.currentPage}
        total={state.pageCounter.countPage}
        callback={methods.pagingEvent}
      />
    </div>
  )
}
