import { IStat } from '../../../utils/types'

export interface ICreateStatProps {
  learnedWords: { all: number; today: number }
}

export interface IUpdateStatProps extends ICreateStatProps {
  data: IStat
}
