import { FC } from 'react'
import { ISection } from './types'
import { getProp } from './utils'

export const Section: FC<ISection> = ({ name, code, first, last }) => {
  const prop = JSON.stringify({ code })

  const sectionListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data = getProp(e)
    console.log(data)
  }

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
