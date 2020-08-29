import React, { useState, Dispatch, SetStateAction } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  cardbody: {
    borderStyle: 'solid',
    width: '80%',
    margin: '0 auto',
    marginTop: '1%',
    height: 'max-content',
    backgroundColor: 'rgb(235, 254, 255)',
    borderRadius: '10px',
  },
  questiontext: {
    color: 'black',
    width: '80%',
    margin: '0 auto',
    fontSize: '2vw',
  },
  answerdiv: {
    width: ' 95%',
    margin: '0 auto',
    borderRadius: '10px',
    cursor: 'pointer',
    height: 'max-content',
    color: 'white',
    borderColor: 'white',
    background: 'linear-gradient(90deg, rgb(86, 204, 255), rgb(110, 175, 180))',
  },
  answertext: {
    fontFamily: 'Catamaran, sans-serif',
    fontSize: '2vw',
    '&:hover': {
      color: 'blue',
    },
  },
  nextButton: {
    width: '20%',
    marginTop: '30px',
    fontSize: '2vw',
  },
}))

export default function QuestionCard({
  question,
  correct_answer,
  answers,
  showNextQuestion,
  setScore,
  setResult,
}: {
  question: string
  correct_answer: string
  answers: string[]
  showNextQuestion: any
  setScore: Dispatch<SetStateAction<number>>
  setResult: Dispatch<SetStateAction<string[]>>
}) {
  const classes = useStyles()

  const [answerChosen, setAnswerChosen] = useState<boolean>(false)
  const [choicesDisabled, setChoicesDisabled] = useState<boolean>(false)
  const [currentAnswer, setCurrentAnswer] = useState<string>('')

  function handleChoice(
    _ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    choice: string
  ) {
    setChoicesDisabled(true)
    setAnswerChosen(true)

    setCurrentAnswer(choice)

    let correctAnswerDiv = document.getElementById(correct_answer)
    if (correctAnswerDiv) correctAnswerDiv.style.background = 'springgreen'

    let wrongAnswerDiv = document.getElementById(choice)
    if (wrongAnswerDiv && choice !== correct_answer)
      wrongAnswerDiv.style.background = 'red'

    if (choice !== correct_answer) setResult(x => x?.concat('Wrong'))

    if (choice === correct_answer) {
      setScore((x: number) => x + 1)
      setResult(x => x?.concat('Correct'))
    }
  }

  function handleNextQuestion() {
    let correctAnswerDiv = document.getElementById(correct_answer)
    let currentAnswerDiv = document.getElementById(currentAnswer)

    if (correctAnswerDiv)
      correctAnswerDiv.style.background =
        'linear-gradient(90deg, rgb(86, 204, 255), rgb(110, 175, 180))'

    if (currentAnswerDiv)
      currentAnswerDiv.style.background =
        'linear-gradient(90deg, rgb(86, 204, 255), rgb(110, 175, 180))'

    showNextQuestion()
    setAnswerChosen(false)
    setChoicesDisabled(false)
  }

  return (
    <>
      <div className={classes.cardbody}>
        <h3 className={classes.questiontext}>{question}</h3>

        {answers.map((v, i) => (
          <div
            style={{
              pointerEvents: choicesDisabled ? 'none' : 'all',
            }}
            id={v}
            key={v}
            onClick={ev => handleChoice(ev, v)}
            className={classes.answerdiv}>
            <p className={classes.answertext}>{v}</p>
          </div>
        ))}
      </div>

      {answerChosen && (
        <Button
          className={classes.nextButton}
          onClick={handleNextQuestion}
          variant='contained'
          color='secondary'>
          Next
        </Button>
      )}
    </>
  )
}
