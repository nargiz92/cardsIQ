export type GetCardsType = {
  answer: string
  currentPage: number
  id: string | undefined
  itemsPerPage: number
  orderBy: null | string
  question: string
}
type ItemsResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string

  question: string

  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}
export type CardsResponse = {
  items: ItemsResponse[]
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}
export type UpdateCardRequestType = {
  answer: string
  answerImg?: string
  id: string
  question: string
  questionImg?: string
}
