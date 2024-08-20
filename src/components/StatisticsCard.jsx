import { useStore } from '@nanostores/preact'
import { statisticsStore } from '../stores/statistic-store'

export const StatisticsCard = () => {
  const { gamesPlayed, totalQuestions, correctQuestions } =
    useStore(statisticsStore)

  return (
    <div class='p-6'>
      <p class='mb-4'>
        <strong>Juegos totales:</strong> {gamesPlayed}
      </p>
      <p class='mb-4'>
        <strong>Respuestas correctas:</strong>
        {correctQuestions}
      </p>
      <p class='mb-4'>
        <strong>Respuestas incorrectas:</strong>
        {totalQuestions - correctQuestions}
      </p>
      <p>
        <strong>Porcentaje de éxito:</strong>{' '}
        {totalQuestions !== 0 ? (correctQuestions * 100) / totalQuestions : 0}%
      </p>
    </div>
  )
}




