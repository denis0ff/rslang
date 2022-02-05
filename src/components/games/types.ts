import { Dispatch, SetStateAction } from 'react'
import { IWord } from '../../utils/types'

export enum GameType {
  AUDIO_CALL = 'audiocall',
  SPRINT = 'sprint',
}

export enum GameStatus {
  SELECT,
  GAME,
  RESULT,
}
export interface IAnswers {
  good: IWord[]
  bad: IWord[]
}

export interface IDifficultyProps {
  type: GameType
  setStatus: Dispatch<SetStateAction<GameStatus>>
  words: IWord[]
  setWords: Dispatch<SetStateAction<IWord[]>>
}

export interface IGameRunProps {
  words: IWord[]
  setAnswers: Dispatch<SetStateAction<IAnswers>>
  setStatus: Dispatch<SetStateAction<GameStatus>>
}

export interface IResultProps {
  answers: IAnswers
  setStatus: Dispatch<SetStateAction<GameStatus>>
}

export interface IAudioButtonProps {
  audio: HTMLAudioElement
  src?: string
}
