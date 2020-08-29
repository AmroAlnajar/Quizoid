import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  ResultsContainer: {
    width: 'max-content',
    height: 'max-content',
    borderStyle: 'solid',
    borderRadius: '20px',
    borderColor: 'purple',
    margin: '0 auto',
  },
  question: {
    marginLeft: '5%',
  },
  answer: {
    marginRight: '5%',
  },
}))

export const Summary = ({ quizSummary }: { quizSummary: string[] }) => {
  const classes = useStyles()

  const questionsAmount = quizSummary.length
  const score = quizSummary.filter((v, i) => v === 'Correct').length

  useEffect(() => {
    // localStorage.setItem(
    //   Date.now().toLocaleString(),
    //   JSON.stringify({ answers: quizSummary, date: Date.now() })
    // )
    // localStorage.setItem(
    //   format(Date.now(), 'dd/MM/yyy - HH:mm a'),
    //   JSON.stringify(quizSummary)
    // )
    // console.log(Object.keys(localStorage))
    // console.log(format(Date.now(), 'dd/MM/yyy - HH:mm a'))
  }, [])

  return (
    <>
      <h1>
        Score: {score}/{questionsAmount}
      </h1>

      <TableContainer
        component={Paper}
        className={classes.ResultsContainer}
        elevation={20}>
        <Table size='small'>
          <TableBody>
            {/* data here */}

            {quizSummary.map((answer, index) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    style={{ fontSize: '0.8vw' }}
                    component='th'
                    scope='row'>
                    Question {index + 1}
                  </TableCell>
                  <TableCell
                    style={{
                      color: answer === 'Correct' ? 'springgreen' : 'red',
                      fontSize: '0.8vw',
                    }}
                    align='right'>
                    {answer}
                  </TableCell>
                </TableRow>
              )
            })}

            {/* data here */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
