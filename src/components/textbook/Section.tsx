import { FC } from 'react'
import { ISection, ISectionDifficult } from './types'

export const Section: FC<ISection> = ({
  name,
  code,
  first,
  last,
  ind,
  checked,
  callback,
}) => {
  const sectionListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const checkGroup = e.currentTarget.dataset.prop || ''
    if (checkGroup && callback) {
      callback(+checkGroup)
    }
  }

  return (
    <button
      style={checked ? { backgroundColor: '#b3065c', opacity: '1' } : {}}
      type="button"
      onClick={sectionListener}
      className="section"
      data-prop={ind}
    >
      <div className="section-title">
        <h2>{name}</h2>
        <p>{`${first}-${last}`}</p>
      </div>
      <div className="section-code">{code}</div>
    </button>
  )
}

export const SectionDifficult: FC<ISectionDifficult> = ({
  name,
  count,
  ind,
  callback,
}) => {
  const sectionListener = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const checkGroup = e.currentTarget.dataset.prop || ''
    if (checkGroup) {
      callback(+checkGroup)
    }
  }

  return (
    <button
      type="button"
      onClick={sectionListener}
      className="section"
      data-prop={ind}
    >
      <div className="section-title">
        <h2>{name}</h2>
        <p>{count}</p>
      </div>
      <div className="section-code">{}</div>
    </button>
  )
}
