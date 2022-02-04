import { Dispatch, SetStateAction } from 'react'
import { IWord } from '../../utils/types'

export interface IAnswers {
  good: IWord[]
  bad: IWord[]
}

export interface IGame {
  status: 'select' | 'game' | 'result'
  words?: IWord[]
  answers?: IAnswers
}

export interface IDifficultyProps {
  type: 'audiocall' | 'sprint'
  setGame: Dispatch<SetStateAction<IGame>>
}

export interface IGameRunProps {
  words: IWord[]
  setGame: Dispatch<SetStateAction<IGame>>
}

export interface IResultProps {
  answers: IAnswers
  setGame: Dispatch<SetStateAction<IGame>>
}
