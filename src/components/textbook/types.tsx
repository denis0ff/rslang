import { IWord } from '../../utils/types'

export type NameSectionType = 'Easy' | 'Normal' | 'Hard' | 'Difficult'

export type CodeLevelType =
  | 'A1'
  | 'A2'
  | 'B1'
  | 'B2'
  | 'C1'
  | 'C2'
  | 'difficult'

export interface ISection {
  name: NameSectionType
  code?: CodeLevelType
  first?: number
  last?: number
  ind?: number
  checked?: boolean
  callback?: (num: number) => void
}

export interface ISectionDifficult {
  name: NameSectionType
  count: number
  ind: number
  callback: (num: number) => void
}

export interface ITextbook {
  readonly sections: ISection[]
  counter: {
    currentGroup: number
    currentPage: number[]
    currentWord: number
    countPage: number
  }
  words: Array<IAggregatedWord>
}

export interface ITextbookMethods {
  pagingEvent: (page: number) => void
  groupEvent: (group: number) => void
  getCurrentPage: () => number
  getCurrentWord: () => IWord
  wordEvent: (num: number) => void
  addDifficultWordEvent: (id: number) => void
  addStudiedWordEvent: (id: number) => void
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

export interface IWordObj {
  word: IWord
  difficultCallback: (id: number) => void
  studiedCallback: (id: number) => void
}

export interface IAggregatedWord extends IWord {
  _id: string
  userWord?: {
    difficulty: WordDifficultyType
  }
}

export interface IAggregatedResponse {
  paginatedResults: IAggregatedWord[]
  totalCount: Array<{ count: number }>
}
