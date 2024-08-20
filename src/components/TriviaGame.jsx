import { useState, useEffect } from 'preact/hooks'
import { updateStatistics } from '../stores/statistic-store'

const timeByQuestion = 30

export default function TriviaGame({ questions, maxQuestions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timeByQuestion)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState(() =>
    suffleArray(questions).slice(0, maxQuestions)
  )

  useEffect(() => {
    let timer
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      handleNextQuestion()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, isPlaying])

  const startGame = () => {
    setIsPlaying(true)
    setTimeLeft(timeByQuestion)
    setCurrentQuestion(0)
    setScore(0)
    setGameOver(false)
    setSelectedQuestions(() => suffleArray(questions).slice(0, maxQuestions))
  }

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1)
    handleNextQuestion()
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < selectedQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setTimeLeft(timeByQuestion)
    } else {
      endGame()
    }
  }

  const endGame = () => {
    setIsPlaying(false)
    setGameOver(true)
    console.log(`Game Over! Your score: ${score}/${selectedQuestions.length}`)
    updateStatistics(selectedQuestions.length, score)
  }

  if (!isPlaying && !gameOver) {
    return (
      <div className='text-center'>
        <button
          onClick={startGame}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Iniciar Quizz
        </button>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4'>Game Over!</h2>
        <p className='text-xl mb-4'>
          Tu puntaje: {score}/{selectedQuestions.length}
        </p>
        <button
          onClick={startGame}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Reiniciar juego
        </button>
      </div>
    )
  }

  const question = selectedQuestions[currentQuestion]

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='mb-1 text-right'>Tiempo restante: {timeLeft}s</div>
      <div className='mb-4 text-right'>
        Pregunta restantes: {selectedQuestions.length - currentQuestion}
      </div>
      <h2 className='text-xl font-bold mb-4'>{question.question}</h2>
      <div className='grid grid-cols-2 gap-4'>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option === question.correctAnswer)}
            className='bg-white dark:bg-gray-800 p-4 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

const suffleArray = (array) => {
  const suffledArray = array.slice()
  let currentIndex = suffledArray.length

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[suffledArray[currentIndex], suffledArray[randomIndex]] = [
      suffledArray[randomIndex],
      suffledArray[currentIndex]
    ]
  }
  return suffledArray
}
