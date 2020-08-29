import React, { useState, useEffect } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { makeStyles } from '@material-ui/core/styles'
import { Summary } from './Summary'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
  firstControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: '1vw',
    fontWeight: 'bold',
    marginRight: '6px',
  },
  controls: {
    fontSize: '2vw',
    cursor: 'pointer',
  },
  container: {
    marginTop: '2%',
  },
  NoHistory: {
    marginTop: '10%',
  },
})

const QuizHistory = () => {
  const classes = useStyles()

  const [LsKeys, setLsKeys] = useState<string[]>([])
  const [currentKey, setCurrentKey] = useState<number>(0)

  useEffect(() => {
    setLsKeys(Object.keys(localStorage))
  }, [])

  const handleBackButton = () => {
    setCurrentKey(x => x - 1)
  }

  const handleForwardButton = () => {
    setCurrentKey(x => x + 1)
  }

  if (localStorage.length <= 0) {
    return <h1 className={classes.NoHistory}>No quiz history found</h1>
  }

  return (
    <div className={classes.container}>
      <h1>Quiz history</h1>
      <div className={classes.firstControls}>
        <Button disabled={currentKey === 0} onClick={handleBackButton}>
          <ArrowBackIosIcon className={classes.controls} />
        </Button>
        <p className={classes.date}>{LsKeys[currentKey]}</p>
        <Button
          disabled={currentKey === LsKeys.length - 1}
          onClick={handleForwardButton}>
          <ArrowForwardIosIcon className={classes.controls} />
        </Button>
      </div>

      {LsKeys.length > 0 && (
        <Summary
          quizSummary={JSON.parse(localStorage.getItem(LsKeys[currentKey])!)}
        />
      )}
    </div>
  )
}

export default QuizHistory
