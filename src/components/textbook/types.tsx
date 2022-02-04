export interface ISection {
  name: string
  code?: string
  first?: number
  last?: number
}

export interface ITextbook {
  sections: ISection[]
}
