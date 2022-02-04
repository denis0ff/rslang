import React, { FC } from 'react'
import { ISection, ITextbook } from './types'
import './Textbook.css'

const getProp = (e: React.MouseEvent<HTMLButtonElement>): string => {
  return JSON.parse(e.currentTarget.dataset.prop || '')
}

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
      <div>
        <h2>{name}</h2>
        <p>{last ? `${first}-${last}` : first}</p>
      </div>
      <div className="section-code">{code}</div>
    </button>
  )
}

// const Word: FC<I>

export const Textbook: FC<ITextbook> = ({ sections }) => {
  return (
    <div className="container">
      <div className="title">Textbook</div>
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
        <Section key="D" name="Difficult words" first={0} />
      </div>
      <div className="title">Words</div>
    </div>
  )
}
