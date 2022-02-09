import { IWord } from '../../../utils/types'

export interface IWordsCompare {
  id: string
  word: string
}
export interface IWordsLearn {
  good: IWord[]
  bad: IWord[]
}
