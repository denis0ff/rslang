import React, { useCallback, useEffect, useState } from 'react'
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
    setenWords(() => [...enWords, ...data])
  }

  const getValue = (value: number) => {
    if (value === 0) {
      setAnswers(wordsLearn)
    }
  }

  const handleAnser = useCallback(
    (anserCompare: boolean) => {
      const compare = index === randomAnserIndex
      if (index === enWords.length - 10) {
        const { group } = words[0]
        const { page } = enWords[enWords.length - 1]
        const newGroup = page + 1 >= 30 ? group + 1 : group
        const newPage = page + 1 >= 30 ? 0 : page + 1
        getAdditionalResurse(newGroup, newPage)
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
    },
    [total, index, coefficient, anserButton]
  )

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') handleAnser(true)
      if (e.code === 'ArrowRight') handleAnser(false)
    }
    document.addEventListener('keyup', onKeydown)
    return () => {
      document.removeEventListener('keyup', onKeydown)
    }
  }, [handleAnser])

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
