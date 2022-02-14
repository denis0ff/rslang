import { useEffect } from 'react'

interface WordsCompareProps {
  EWord: string
  RWord: string
  anser: boolean
  onClickIndex: (isRight: boolean) => void
}

const RightAnser = <span>&#10003;</span>
const NegativeAnser = <span>&#10006;</span>
const WordsCompare = (props: WordsCompareProps) => {
  const { EWord = 'Car', RWord = 'Машина', anser = true, onClickIndex } = props
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') onClickIndex(true)
      if (e.code === 'ArrowRight') onClickIndex(false)
    }
    document.addEventListener('keydown', onKeydown)
    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [onClickIndex])
  return (
    <div className="compare-wrapper">
      <div
        className={
          anser ? 'anser-results anser-right' : 'anser-results anser-negative'
        }
      >
        {anser ? RightAnser : NegativeAnser}
      </div>
      <div className="words-block">
        <h2 className="word-compare">{EWord}</h2>
        <h5 className="word-compare">это</h5>
        <h2 className="word-compare">{RWord}</h2>
      </div>
      <div className="button-block">
        <button
          tabIndex={-1}
          type="button"
          className="button-compare anser-right"
          onClick={() => {
            onClickIndex(true)
          }}
        >
          Верно
        </button>
        <button
          type="button"
          className="button-compare anser-negative"
          onClick={() => {
            onClickIndex(false)
          }}
        >
          Неверно
        </button>
      </div>
    </div>
  )
}
export default WordsCompare
