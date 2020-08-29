import axios from 'axios'
import { Question, ServerQuestion } from './types'
import {
  QUESTIONS_TYPE,
  API_URL,
  QUESTIONS_AMOUNT,
  QUESTIONS_DIFFICULTY,
} from './constants'

export const fetchQuestions = async (): Promise<Question[]> => {
  const req = await axios.get(
    `${API_URL}?amount=${QUESTIONS_AMOUNT}&difficulty=${QUESTIONS_DIFFICULTY}&type=${QUESTIONS_TYPE}`
  )

  const apiQuestions: ServerQuestion[] = req.data.results

  const newQuestions: Question[] = apiQuestions.map((value: ServerQuestion) => {
    return {
      question: fixEncoding(value.question),
      answers: shuffleArray([
        ...value.incorrect_answers.map(v => fixEncoding(v)),
        fixEncoding(value.correct_answer),
      ]),
      correct_answer: value.correct_answer,
    }
  })

  return newQuestions
}

const fixEncoding = (text: string) => {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&deg;/g, 'c')
}

const shuffleArray = (array: string[]): string[] => {
  let currentIndex: number = array.length,
    temporaryValue,
    randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
