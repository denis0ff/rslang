import React, { FC } from 'react'
import { ISection, ITextbook } from './types'
import './Textbook.css'
import data1 from './words'
import Pic from '../../../src/1.jpg'


const getProp = (e: React.MouseEvent<HTMLButtonElement>): string => {
  return JSON.parse(e.currentTarget.dataset.prop || '')
}

const sectionListener = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  const data = getProp(e)
  /*
  let maxW1 = 0;
  let maxT1 = 0;
  let w1 = ''
  let t1 = ''
  for (let i = 0; i < data1.length; i += 1) {
    if (maxW1 < data1[i].word.length) {
      maxW1 = data1[i].word.length
      w1 = data1[i].word
    }
    if (maxT1 < data1[i].wordTranslate.length) {
      maxT1 = data1[i].wordTranslate.length
      t1 = data1[i].wordTranslate
    }
  }
  console.log(maxW1, w1, maxT1, t1)
  */
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
        <div className="title-path">Vocabulary</div>
        <div className="sections sections-vocabulary">
          <Section key="D" name="Difficult" first={0} />
        </div>
      </>
    )
  }
  return ''
}

export const Textbook: FC<ITextbook> = ({ sections }) => {
  return (
    <div className="container">
      <div className="title">Textbook</div>
      <div className="title-path">Word difficulty levels</div>
      <div className="sections">
        {sections.map((item) => {
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
      <div className="title">Words</div>
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
        </div>
        <div className="word">
          <img src={Pic} alt="pic" className="word_image" />
        </div>
      </div>
    </div>
  )
}
