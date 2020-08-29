import React, { useState, useEffect } from 'react'
import { fetchQuestions } from './utils/FetchData'
import QuestionCard from './Components/QuestionCard'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Question } from './utils/types'
import { Summary } from './Components/Summary'
import QuizHistory from './Components/QuizHistory'
import { format } from 'date-fns'

const useStyles = makeStyles({
  '@global': {
    body: {
      background:
        ' linear-gradient(90deg,rgba(9, 9, 121, 1) 0%,rgba(0, 212, 255, 1) 48%)',
    },
  },
  App: { textAlign: 'center' },
  Appheader: {
    color: 'white',
    fontFamily: "'Dancing Script', cursive",
    fontSize: '6vw',
    marginTop: '0px',
  },
  QuestionHeader: {
    marginTop: '-3%',
    color: 'yellow',
    fontSize: '1.7vw',
    fontFamily: "'Rowdies', cursive",
  },
  ScoreHeader: { fontSize: '1.5vw', color: 'deeppink' },
  startButton: { marginTop: '0', width: 'max-content', fontSize: '2vw' },
})

const App = () => {
  const classes = useStyles()

  const [Questions, setQuestions] = useState<Question[]>()
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [quizStarted, setQuizStarted] = useState<boolean>(false)
  const [quizFinished, setQuizFinished] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [result, setResult] = useState<string[]>([])

  useEffect(() => {
    fetchQuestions().then(x => setQuestions(x))
    return () => {
      setQuestions([])
    }
  }, [])

  const handleStartButton = (): void => {
    setResult([])
    setQuizStarted(true)
    setQuizFinished(false)
    setCurrentQuestion(0)
    setScore(0)
  }

  const showNextQuestion = (): void => {
    if (Questions && currentQuestion >= Questions?.length - 1) {
      setQuizFinished(true)
      setQuizStarted(false)

      localStorage.setItem(
        format(Date.now(), 'dd/MM/yyy - HH:mm a'),
        JSON.stringify(result)
      )
    }

    console.log({ result })

    setCurrentQuestion(currentQuestion + 1)
  }

  return (
    <div className={classes.App}>
      <h1 className={classes.Appheader}>{process.env.REACT_APP_NAME}</h1>

      {!quizStarted && (
        <>
          <Button
            className={classes.startButton}
            variant='contained'
            color='primary'
            onClick={handleStartButton}>
            {!quizFinished ? 'Start' : 'New quiz'}
          </Button>
        </>
      )}

      {!!Questions && Questions?.length > 0 && !quizFinished && !!quizStarted && (
        <div>
          <h1 className={classes.QuestionHeader}>{`Question: ${
            currentQuestion + 1
          }/${Questions.length}`}</h1>
          <h1 className={classes.ScoreHeader}>
            Score: {score}/{Questions.length}
          </h1>
          <QuestionCard
            showNextQuestion={showNextQuestion}
            correct_answer={Questions[currentQuestion].correct_answer}
            question={Questions[currentQuestion].question}
            answers={Questions[currentQuestion].answers}
            setScore={setScore}
            setResult={setResult}
          />
        </div>
      )}

      {quizFinished && <Summary quizSummary={result} />}

      {!quizStarted && !quizFinished && <QuizHistory />}
    </div>
  )
}

export default App
