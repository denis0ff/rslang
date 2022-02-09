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
  pageCounter: {
    countItems: number
    currentPage: number
    countPage: number
    readonly itemPerPage: number
  }
}

export interface ITextbookMethods {
  pagingEvent: (num: number) => void
}

export type WordlistItemLabelType = 'studied' | 'difficult'

export interface IWordlistItem {
  word: string
  trans: string
  label?: WordlistItemLabelType
}

export interface IWordObj {
  word?: IWord
}
