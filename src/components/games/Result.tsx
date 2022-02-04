import { IResultProps } from './types'

export const Result = ({ answers, setStatus }: IResultProps) => {
  console.log(answers, setStatus)
  return <h2>Результаты игры</h2>
}
