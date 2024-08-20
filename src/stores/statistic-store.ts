import { persistentMap } from '@nanostores/persistent'

type Statistics = {
  gamesPlayed: string
  totalQuestions: string
  correctQuestions: string
}

export const statisticsStore = persistentMap<Statistics>('statistics:', {
  totalQuestions: '0',
  correctQuestions: '0',
  gamesPlayed: '0'
})

export const updateStatistics = (
  additionalTotalQuestions: number,
  additionalCorrectQuestions: number
) => {
  const { gamesPlayed, totalQuestions, correctQuestions } =
    statisticsStore.get()

  statisticsStore.setKey(
    'totalQuestions',
    String(Number(totalQuestions) + additionalTotalQuestions)
  )

  statisticsStore.setKey(
    'correctQuestions',
    String(Number(correctQuestions) + additionalCorrectQuestions)
  )

  statisticsStore.setKey('gamesPlayed', String(Number(gamesPlayed) + 1))
}


