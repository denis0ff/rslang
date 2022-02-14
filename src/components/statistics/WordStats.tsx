import { IWordStatProps } from './types'

export const WordStat = ({ learnedWords, newWords, right }: IWordStatProps) => {
  return (
    <article>
      <h2>Статистика за сегодня</h2>
      <div>
        <h3>
          <b>{learnedWords}</b> новых слов
        </h3>
        <h3>{newWords} слов изучено</h3>
        <h3>{right}% правильных ответов</h3>
      </div>
    </article>
  )
}
