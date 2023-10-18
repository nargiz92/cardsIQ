import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authSlice } from '@/services/auth/auth-slice'
import { baseApi } from '@/services/base-api'
import { cardsSlice } from '@/services/cards-service'
import { deckSlice } from '@/services/decks/deck-slice'
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [cardsSlice.name]: cardsSlice.reducer,
    [deckSlice.name]: deckSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
