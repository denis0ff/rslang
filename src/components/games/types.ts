import { Dispatch, SetStateAction } from 'react'
import { IWord } from '../../utils/types'

export enum GameType {
  AUDIO_CALL = 'audiocall',
  SPRINT = 'sprint',
}

export interface IWords {
  chunk: IWord[]
  page: number
}
export interface IAnswers {
  good: IWord[]
  bad: IWord[]
}

export interface IDifficultyProps {
  type: GameType
  setStatus: Dispatch<SetStateAction<string>>
  words: IWords
  setWords: Dispatch<SetStateAction<IWords>>
}

export interface IGameRunProps {
  words: IWords
  setAnswers: Dispatch<SetStateAction<IAnswers>>
  setStatus: Dispatch<SetStateAction<string>>
}

export interface IResultProps {
  answers: IAnswers
  setStatus: Dispatch<SetStateAction<string>>
}
