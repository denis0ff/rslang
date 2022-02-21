import { Dispatch, SetStateAction } from 'react'
import { IGotUserWord, IStat, IWord } from '../../utils/types'

export enum GameType {
  AUDIO_CALL = 'Аудиовызов',
  SPRINT = 'Спринт',
}

export enum GameStatus {
  SELECT,
  GAME,
  RESULT,
  TEXTBOOK,
  ERROR,
}
export interface IAnswers {
  right: IWord[]
  wrong: IWord[]
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
  answers: IAnswers
  setAnswers: Dispatch<SetStateAction<IAnswers>>
  setStatus: Dispatch<SetStateAction<GameStatus>>
}

export interface IResultProps extends IGameRunProps {
  answers: IAnswers
  setAnswers: Dispatch<SetStateAction<IAnswers>>
  setStatus: Dispatch<SetStateAction<GameStatus>>
  setWords: Dispatch<SetStateAction<IWord[]>>
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
  setActive: Dispatch<SetStateAction<ResultViews>>
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

export interface IAddWordStatProps {
  answers: IAnswers
  gameType: GameTypeOption
}

export interface IUpdateStatProps extends IAddWordStatProps {
  data: IStat
}

export interface IPutStatPromiseProps extends IUpdateStatProps {
  learnedWords: { all: number; today: number }
}

export interface IGameProps {
  textbookWords?: IWord[]
}

export interface IGameErrorProps {
  setStatus: Dispatch<SetStateAction<GameStatus>>
  setWords: Dispatch<SetStateAction<IWord[]>>
}
