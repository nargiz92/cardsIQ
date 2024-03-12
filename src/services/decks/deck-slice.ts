import { ReactNode } from 'react'

import { Sort } from '@/pages/decks/decks'
import defaultAva from '@/styles/assets/icons/image-pen-svgrepo-com.svg'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
type DecksSliceType = {
  addCardSelectValue: string
  authorId: string
  ava: ReactNode
  cardsAnswer: string
  cardsQuestion: string
  currentDecksPage: number
  decksName: string
  isCover: string
  isPrivates: boolean
  itemsPerPage: string
  radioSelectedValue: string
  ranger: number[]
  searchByName: string
  showAnswer: boolean
  showButton: boolean
  sliderValues: number[]
  sort: Sort
  userId: string
}
const initialState: DecksSliceType = {
  addCardSelectValue: 'text',
  authorId: '',
  ava: defaultAva,
  cardsAnswer: '',
  cardsQuestion: '',
  currentDecksPage: 1,
  decksName: '',
  isCover: '',
  isPrivates: false,
  itemsPerPage: '10',
  radioSelectedValue: '1',
  ranger: [0, 100],
  searchByName: '',
  showAnswer: false,
  showButton: true,
  sliderValues: [0, 100],
  sort: null,
  userId: '',
}

export const deckSlice = createSlice({
  initialState,
  name: 'deckSlice',
  reducers: {
    setAddCardsSelectValue: (state, action) => {
      state.addCardSelectValue = action.payload
    },
    setAuthorId: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload
    },
    setAva: (state, action) => {
      state.ava = action.payload
    },
    setCardsAnswer: (state, action) => {
      state.cardsAnswer = action.payload
    },
    setCardsQuestion: (state, action) => {
      state.cardsQuestion = action.payload
    },
    setCurrentDecksPage: (state, action: PayloadAction<number>) => {
      state.currentDecksPage = action.payload
    },

    setDecksName: (state, action) => {
      state.decksName = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload
    },
    setPhoto: (state, action) => {
      state.isCover = action.payload
    },
    setPrivate: (state, action: PayloadAction<boolean>) => {
      state.isPrivates = action.payload
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
    setSelectedValue: (state, action) => {
      state.radioSelectedValue = action.payload
    },
    setShowAnswer: (state, action) => {
      state.showAnswer = action.payload
    },
    setShowButton: (state, action) => {
      state.showButton = action.payload
    },
    setSliderValues: (state, action) => {
      state.sliderValues = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setValueCommit: (state, action) => {
      state.ranger = action.payload
    },
  },
})
export const {
  setAddCardsSelectValue,
  setAuthorId,
  setAva,
  setCardsAnswer,
  setCardsQuestion,
  setCurrentDecksPage,
  setItemsPerPage,
  setSearchByName,
  setSelectedValue,
  setShowAnswer,
  setShowButton,
  setSliderValues,
  setSort,
} = deckSlice.actions
