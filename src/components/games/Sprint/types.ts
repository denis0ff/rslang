import { IWord } from '../../../utils/types'

export interface IWordsCompare {
  id: string
  word: string
}
export interface IWordsLearn {
  good: IWord[]
  bad: IWord[]
}
export interface ITimerProps {
  end?: boolean
  onTimer: React.Dispatch<React.SetStateAction<number>>
  conrols: (value: number, gameEnd?: boolean) => void
}
export type Color = {
  color: string
}
