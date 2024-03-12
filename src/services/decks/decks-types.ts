export type GetDeckArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: null | string
} | null
export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface Author {
  id: string
  name: string
}

export type CreateCardRequestType = {
  answer: string
  answerImg?: string
  deckId: string
  question: string
  questionImg?: string
}
export interface Deck {
  author: Author
  cardsCount: number
  cover: null | string
  created: string
  id: string
  isBlocked: boolean | null
  isDeleted: boolean | null
  isPrivate: boolean
  name: string
  rating: number
  shots: number
  updated: string
  userId: string
}

export interface DecksResponse {
  items: Deck[]
  maxCardsCount: number
  pagination: Pagination
}
export type LearnRequestType = {
  id: string | undefined
  previousCardId?: string
}
export type SaveGradeRequestBody = {
  cardId: string
  grade: number
}
export type LearnResponse = {
  answer: string
  answerImg: string
  answerVideo: null
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: null
  shots: number
  updated: string
}
export type UpdateDeckRequestType = Partial<{
  cover?: string
  id: string
  isPrivate: boolean
  name: string
}>
