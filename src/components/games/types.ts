import { Dispatch, SetStateAction } from 'react'
import { IGotUserWord, IWord } from '../../utils/types'

export enum GameType {
  AUDIO_CALL = 'Аудиовызов',
  SPRINT = 'Спринт',
}

export enum GameStatus {
  SELECT,
  GAME,
  RESULT,
}
export interface IAnswers {
  right: IWord[]
  wrong: IWord[]
}

export interface IGameStats extends IAnswers {
  streak: number
  max: number
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
  words: IWord[]
  setStatus: Dispatch<SetStateAction<GameStatus>>
  setAnswers: Dispatch<SetStateAction<IAnswers>>
}

export interface IAudioButtonProps {
  audio: HTMLAudioElement
  src?: string
}

export enum ResultViews {
  RESULT = 'Результат',
  WORDS = 'Мои слова',
}

export enum WordListType {
  MISTAKE = 'Ошибся',
  SUCCESS = 'Успешно',
}

export interface IWordListProps {
  type: WordListType
  audio: HTMLAudioElement
  words: IWord[]
}

export interface IResultViewProps {
  right: number
  wrong: number
  nextGame: () => void
}

export interface IPostWordProps {
  isRight: boolean
  id: string
  gameType: GameTypeOption
}

export enum Errors {
  ERROR_401 = 401,
  ERROR_404 = 404,
}

export interface IPutWordProps extends IPostWordProps {
  data: IGotUserWord
}

export enum GameTypeOption {
  AUDIO_CALL = 'audioCall',
  SPRINT = 'sprint',
}
