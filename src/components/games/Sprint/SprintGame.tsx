import React, { useCallback, useContext, useEffect, useState } from 'react'
import { GameStatus, GameTypeOption, IGameRunProps } from '../types'
import { AuthContext, getWordsPromise } from '../../../utils/services'

import Timer from './timer'
import Score from './total'
import WordsCompare from './wordsCompare'
import './styles/style.css'
import { addWord, addWordStat } from '../utils'
import { getRandomAnswers } from '../../../utils/utils'

const Title = () => <h2>SprintGame</h2>

export const SprintGame = ({
  words,
  answers,
  setStatus,
  setAnswers,
}: IGameRunProps) => {
  const { isAuth } = useContext(AuthContext)
  const [index, setIndexWord] = useState(0)
  const [end, setGameEnd] = useState(true)
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

  const getValue = (value: number, flag?: boolean) => {
    if (value === 0 || flag) {
      if (isAuth) addWordStat({ answers, gameType: GameTypeOption.SPRINT })
      setStatus(GameStatus.RESULT)
    }
  }

  const handleAnser = useCallback(
    (anserCompare: boolean) => {
      const compare = index === randomAnserIndex
      const isRight = compare === anserCompare
      if (index === enWords.length - 5) {
        const { group } = words[0]
        const { page } = enWords[enWords.length - 1]
        if (page - 1 < 0) {
          setGameEnd(!end)
        } else {
          const newPage = page - 1 >= 0 ? page - 1 : 0
          if (newPage !== 0) {
            getAdditionalResurse(group, newPage)
          }
        }
      }
      if (index === enWords.length - 1) {
        setGameEnd(!end)
      }

      if (compare === anserCompare) {
        setAnserButton(true)
        setCoefficient(coefficient + 1)
        setAnswers((prev) => ({
          ...prev,
          ...{
            right: [...prev.right, enWords[index]],
            streak: prev.streak + 1,
          },
        }))
      } else {
        setAnserButton(false)
        setCoefficient(0)
        setAnswers((prev) => ({
          ...prev,
          ...{
            wrong: [...prev.wrong, enWords[index]],
            max: prev.max < prev.streak ? prev.streak : prev.max,
            streak: 0,
          },
        }))
      }
      setIndexWord(index + 1)
      setTotal(total + coefficient * 10)
      if (isAuth)
        addWord({
          isRight,
          id: words[index].id,
          gameType: GameTypeOption.SPRINT,
        })
    },
    [total, index, coefficient, anserButton]
  )

  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') handleAnser(true)
      if (e.code === 'ArrowRight') handleAnser(false)
    }
    document.addEventListener('keyup', onKeyup)
    return () => {
      document.removeEventListener('keyup', onKeyup)
    }
  }, [handleAnser])

  return (
    <div className="container">
      <div className="wrapper">
        <Title />
        <Timer onTimer={setStatus} end={end} conrols={getValue} />
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
