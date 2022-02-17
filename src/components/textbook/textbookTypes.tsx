import { IUserWord, IWord } from '../../utils/types'

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
  }
  words: Array<IAggregatedWord>
  difficultWordsCount: number
}

export interface ITextbookMethods {
  getWords: (isNotReset?: boolean) => void
  pagingEvent: (page: number) => void
  groupEvent: (group: number) => void
  groupDifficultEvent: (group: number) => void
  getCurrentPage: () => number
  getCurrentWord: () => IAggregatedWord
  wordEvent: (num: number) => void
  difficultyWordEvent: (check: IWordAddition) => void
  deleteDifficultyWordEvent: (id: string) => void
}

export type WordDifficultyType = 'studied' | 'difficult' | 'all'

export interface IWordlistItem {
  ind: number
  word: string
  trans: string
  active: boolean
  label?: WordDifficultyType
  callback: (num: number) => void
}

export interface IWordAddition {
  id: string
  difficulty: WordDifficultyType
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
