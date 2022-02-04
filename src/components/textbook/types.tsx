export type NameSectionType = 'Easy' | 'Normal' | 'Hard' | 'Difficult words'

export type CodeSectionType =
  | 'A1'
  | 'A2'
  | 'B1'
  | 'B2'
  | 'C1'
  | 'C2'
  | 'difficult'

export interface ISection {
  name: NameSectionType
  code?: CodeSectionType
  first?: number
  last?: number
}

export interface ITextbook {
  sections: ISection[]
}
