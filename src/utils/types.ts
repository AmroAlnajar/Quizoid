export type Question = {
  question: string
  correct_answer: string
  answers: string[]
}

export type ServerQuestion = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}
