import { useCallback, useState } from 'react'
import { GameStat } from '../components/statistics/GameStats'
import { LongStats } from '../components/statistics/LongStats'
import { getStats } from '../components/statistics/utils'
import { WordStat } from '../components/statistics/WordStats'
import { IStat } from '../utils/types'

export const Statistics = () => {
  const [stats, setStats] = useState<IStat>({
    learnedWords: 0,
    optional: {
      words: '',
      date: '',
      games: {
        sprint: { newWords: 0, allWords: 0, right: 0, streak: 0 },
        audioCall: { newWords: 0, allWords: 0, right: 0, streak: 0 },
      },
      longStat: '',
    },
  })
  const getStatsCallback = useCallback(() => {
    getStats(setStats)
  }, [])
  return (
    <>
      <WordStat
        newWords={
          stats.optional.games.sprint.newWords +
          stats.optional.games.audioCall.newWords
        }
        learnedWords={stats.learnedWords}
        right={
          (stats.optional.games.sprint.right +
            stats.optional.games.audioCall.right) /
          (stats.optional.games.sprint.allWords +
            stats.optional.games.audioCall.allWords)
        }
      />
      <GameStat games={stats.optional.games} />
      <LongStats />
    </>
  )
}
