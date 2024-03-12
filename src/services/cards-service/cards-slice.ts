import { Sort } from '@/pages/decks/decks'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
type CartsType = {
  answer: string
  currentPage: number
  itemsPerPage: string
  question: string
  search: string
  sortCard: Sort
}
const initialState: CartsType = {
  answer: '',
  currentPage: 1,
  itemsPerPage: '10',
  question: '',
  search: '',
  sortCard: null,
}

export const cardsSlice = createSlice({
  initialState,
  name: 'cardsSlice',
  reducers: {
    setAnswer: (state, action) => {
      state.answer = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload
    },
    setQuestion: (state, action) => {
      state.question = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setSortCards: (state, action) => {
      state.sortCard = action.payload
    },
  },
})
export const { setAnswer, setCurrentPage, setItemsPerPage, setQuestion, setSearch, setSortCards } =
  cardsSlice.actions
