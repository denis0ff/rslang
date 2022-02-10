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
}

export interface ITextbook {
  sections: ISection[]
  counter: {
    currentGroup: number
    currentPage: number[]
    currentWord: number[]
    countPage: number
  }
  words: Array<IWord>
}

export interface ITextbookMethods {
  pagingEvent: (page: number) => void
  groupEvent: (group: number) => void
  getCurrentPage: () => number
  getCurrentWord: () => IWord
  setCurrentWord: (num: number) => void
}

export type WordlistItemLabelType = 'studied' | 'difficult'

export interface IWordlistItem {
  ind: number
  word: string
  trans: string
  label?: WordlistItemLabelType
  setWord: (num: number) => void
}

export interface IWordObj {
  word: IWord
}
