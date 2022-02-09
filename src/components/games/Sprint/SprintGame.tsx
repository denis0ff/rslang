import React, { useCallback, useState } from 'react'
import { IGameRunProps } from '../types'
import { getWordsPromise } from '../../../utils/services'
import { getRandomInteger, shuffle } from '../../../utils/utils'
import Timer from './timer'
import Score from './total'
import WordsCompare from './wordsCompare'
import './styles/style.css'
import { IWordsLearn } from './types'

const Title = () => <h2>SprintGame</h2>
const wordsLearn: IWordsLearn = { good: [], bad: [] }

export const SprintGame = (props: IGameRunProps) => {
  const { words } = props
  const [index, setIndexWord] = useState(0)
  const [total, setTotal] = useState(0)
  const [coefficient, setCoefficient] = useState(0)
  const [anserButton, setAnserButton] = useState(true)
  const [enWords, setenWords] = useState(words)

  const randomIndex = (i: number): number => {
    const randomItem = getRandomInteger(0, enWords.length - 1)
    return randomItem === i ? randomIndex(i) : randomItem
  }
  const getAnswers = (indexRight: number): number => {
    const rIndex = randomIndex(index)
    return shuffle([rIndex, indexRight])[0]
  }

  const randomAnserIndex = getAnswers(index)
  const getAdditionalResurse = async (group: number, page: number) => {
    const arrowWords = await getWordsPromise(group, page)
    const { data } = arrowWords
    setenWords([...enWords, ...data])
  }

  function handleIndex(event: React.MouseEvent<HTMLButtonElement>): void {
    let anserCompare: string | undefined
    if (event.target) {
      const target: HTMLButtonElement = event.target as HTMLButtonElement
      anserCompare = target.dataset.type
    }
    const compare = index === randomAnserIndex
    if (index === enWords.length - 4) {
      const { page } = words[0]
      const { group } = words[0]
      const newPage = page + 1 >= 30 ? page - 1 : page + 1
      getAdditionalResurse(group, newPage)
    }
    if (compare.toString() === anserCompare) {
      setAnserButton(true)
      setCoefficient(coefficient + 1)
      wordsLearn.good.push(enWords[index])
    } else {
      setAnserButton(false)
      setCoefficient(0)
      wordsLearn.bad.push(enWords[index])
    }
    setIndexWord(index + 1)
    setTotal(total + coefficient * 10)
  }

  const memoizedCallback = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      handleIndex(e)
    },
    [total, index, coefficient, anserButton]
  )
  return (
    <div className="container">
      <div className="wrapper">
        <Title />
        <Timer />
        <Score coefficient={coefficient} total={total} anser={anserButton} />
        <WordsCompare
          onClickIndex={memoizedCallback}
          EWord={enWords[index].word}
          RWord={enWords[randomAnserIndex].wordTranslate}
          anser={anserButton}
        />
      </div>
    </div>
  )
}
