import { Dispatch, SetStateAction } from 'react'

export interface IWord {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  wordTranslate: string
  textMeaningTranslate: string
  textExampleTranslate: string
}

export interface IGame {
  status: 'select' | 'game'
  words?: IWord[]
}

export interface IDifficultyProps {
  type: 'audiocall' | 'sprint'
  setGame: Dispatch<SetStateAction<IGame>>
}

export interface IGameRunProps {
  words: IWord[]
}
