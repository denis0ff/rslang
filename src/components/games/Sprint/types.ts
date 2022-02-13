import { IWord } from '../../../utils/types'

export interface IWordsCompare {
  id: string
  word: string
}
export interface IWordsLearn {
  good: IWord[]
  bad: IWord[]
}
export interface ItimerProps {
  onTimer: React.Dispatch<React.SetStateAction<number>>
  conrols: (value: number) => void
}
export type Color = {
  color: string
}
