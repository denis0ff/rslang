import { IUserWord, IWord, WordDifficulties } from '../../utils/types'

export type NameSectionType = 'Easy' | 'Normal' | 'Hard' | 'Difficult'

export type CodeLevelType =
  | 'A1'
  | 'A2'
  | 'B1'
  | 'B2'
  | 'C1'
  | 'C2'
  | 'difficult'

export interface ISectionData {
  name: NameSectionType
  code: CodeLevelType
  first: number
  last: number
}

export interface ISection extends ISectionData {
  ind: number
  checked: boolean
  callback: (num: number) => void
}

export interface ISectionDifficult {
  name: NameSectionType
  count: number
  ind: number
  checked: boolean
  callback: (num: number) => void
}

export interface IAggregatedWord extends IWord {
  _id?: string
  userWord?: IUserWord
}

export interface ITextbook {
  counter: {
    currentGroup: number
    currentPage: number[]
    currentWord: number
    countPage: number
    difficultWordsCount: number
  }
  words: Array<IAggregatedWord>
  aggrWords: Array<IAggregatedWord>
}

export interface ITextbookMethods {
  getPageWords: () => void
  pagingEvent: (page: number) => void
  groupEvent: (group: number) => void
  groupDifficultEvent: (group: number) => void
  getCurrentPage: () => number
  getCurrentWord: () => IAggregatedWord
  wordEvent: (num: number) => void
  difficultyWordEvent: (check: IWordAddition) => void
  deleteDifficultyWordEvent: (id: string) => void
  getMarkPages: (group: number) => Array<boolean>
}

export interface IWordlistItem {
  ind: number
  word: IAggregatedWord
  active: boolean
  label?: WordDifficulties
  callback: (num: number) => void
}

export interface IWordAddition {
  id: string
  difficulty: WordDifficulties
  isNew: boolean
}

export interface IWordObj {
  word: IAggregatedWord
  difficulty: (check: IWordAddition) => void
  deleteDifficulty: (id: string) => void
  state: ITextbook
}

export interface IWordAudioFiles {
  audio: HTMLAudioElement
  audioMeaning: HTMLAudioElement
  audioExample: HTMLAudioElement
}

export interface IAggregatedResponse {
  paginatedResults: IAggregatedWord[]
  totalCount: Array<{ count: number }>
}

export interface IVolumeSVG {
  color: string
}

export enum TPColors {
  STUDIED = '#366a89;',
  STUDY = '#4a4a4a;',
}

export enum Game {
  AUDIOCALL = 'audioCall',
  SPRINT = 'sprint',
}
