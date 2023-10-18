import { Sort } from '@/pages/decks/decks'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  answer: '',
  currentPage: 1,
  itemsPerPage: '10',
  question: '',
  search: '',
  sortCard: {} as Sort,
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
      state.sortCard = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setSortCards: (state, action) => {
      state.sortCard = action.payload
    },
  },
})
