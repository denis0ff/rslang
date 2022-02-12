import React, { useCallback, useState } from 'react'
import { IAnswers, IGameRunProps } from '../types'
import { getWordsPromise } from '../../../utils/services'
import { getRandomInteger, shuffle } from '../../../utils/utils'

import Timer from './timer'
import Score from './total'
import WordsCompare from './wordsCompare'
import './styles/style.css'

const Title = () => <h2>SprintGame</h2>
const wordsLearn: IAnswers = { good: [], bad: [] }

const getRandomAnswers = (currentIindex: number, maxIndex: number): number => {
  const randomIndex = (max: number): number => {
    const randomItem = getRandomInteger(0, max)
    return randomItem === currentIindex ? randomIndex(max) : randomItem
  }
  const rIndex = randomIndex(maxIndex)
  return shuffle([rIndex, currentIindex])[0]
}

export const SprintGame = ({ words, setStatus, setAnswers }: IGameRunProps) => {
  const [index, setIndexWord] = useState(0)
  const [total, setTotal] = useState(0)
  const [coefficient, setCoefficient] = useState(0)
  const [anserButton, setAnserButton] = useState(true)
  const [enWords, setenWords] = useState(words)

  const randomAnserIndex = getRandomAnswers(index, enWords.length - 1)
  const getAdditionalResurse = async (group: number, page: number) => {
    const arrowWords = await getWordsPromise(group, page)
    const { data } = arrowWords
    setenWords([...enWords, ...data])
  }

  function handleIndex(anserCompare: boolean): void {
    const compare = index === randomAnserIndex
    if (index === enWords.length - 4) {
      const { page, group } = words[0]
      const newPage = page + 1 >= 30 ? page - 1 : page + 1
      getAdditionalResurse(group, newPage)
    }
    if (compare === anserCompare) {
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
  const getValue = (value: number) => {
    if (value === 0) {
      setAnswers(wordsLearn)
    }
  }

  const handleAnser = useCallback(
    (anser: boolean) => {
      handleIndex(anser)
    },
    [total, index, coefficient, anserButton]
  )
  return (
    <div className="container">
      <div className="wrapper">
        <Title />
        <Timer onTimer={setStatus} conrols={getValue} />
        <Score coefficient={coefficient} total={total} anser={anserButton} />
        <WordsCompare
          onClickIndex={handleAnser}
          EWord={enWords[index].word}
          RWord={enWords[randomAnserIndex].wordTranslate}
          anser={anserButton}
        />
      </div>
    </div>
  )
}
