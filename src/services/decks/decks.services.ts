import {
  Deck,
  DecksResponse,
  GetDeckArgs,
  LearnRequestType,
  LearnResponse,
  SaveGradeRequestBody,
  UpdateDeckRequestType,
} from '@/services'
import { baseApi } from '@/services/base-api'
import { RootState } from '@/services/store'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Decks'],
        // async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        //   const state = getState() as RootState;
        //
        //   try {
        //     const response = await queryFulfilled;
        //
        //     dispatch(
        //       decksService.util.updateQueryData(
        //         "getDecks",
        //         {
        //           currentPage: state.deckSlice.currentPage,
        //           itemsPerPage: +state.deckSlice.itemsPerPage,
        //           name: state.deckSlice.searchByName,
        //           orderBy: state.deckSlice.sort,
        //           authorId: state.deckSlice.authorId,
        //           maxCardsCount: state.deckSlice.sliderValues[1],
        //           minCardsCount: state.deckSlice.sliderValues[0],
        //         },
        //         (draft) => {
        //           draft.items.unshift(response.data);
        //         },
        //       ),
        //     );
        //   } catch (error) {
        //     console.log(error);
        //   }
        // },

        query: data => ({
          body: data,
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteDeck: builder.mutation<void, { id: string | undefined }>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState
          const patchResult = dispatch(
            decksService.util.updateQueryData(
              'getDecks',
              {
                authorId: state.deckSlice.authorId,
                currentPage: state.deckSlice.currentDecksPage,
                itemsPerPage: +state.deckSlice.itemsPerPage,
                maxCardsCount: state.deckSlice.sliderValues[1],
                minCardsCount: state.deckSlice.sliderValues[0],
                name: state.deckSlice.searchByName,
                orderBy: state.deckSlice.sort?.direction,
              },
              draft => {
                draft.items = draft.items.filter(item => item.id !== id)
              }
            )
          )

          try {
            await queryFulfilled
          } catch (error) {
            patchResult.undo()
          }
        },
        query: data => ({
          method: 'DELETE',
          url: `v1/decks/${data.id}`,
        }),
      }),
      getDecks: builder.query<DecksResponse, GetDeckArgs>({
        providesTags: ['Decks'],
        query: args => {
          return {
            method: 'GET',
            params: args as Record<string, any> | undefined,
            url: `v2/decks`,
          }
        },
      }),
      getDecksById: builder.query<any, { id: string | undefined }>({
        query: data => {
          return {
            method: 'GET',
            url: `v1/decks/${data.id}`,
          }
        },
      }),
      learnCards: builder.query<LearnResponse, LearnRequestType>({
        providesTags: ['Learn'],
        query: data => {
          return {
            method: 'GET',
            url: `v1/decks/${data.id}/learn`,
          }
        },
      }),
      nextQuestion: builder.mutation<LearnResponse, SaveGradeRequestBody>({
        // },
        invalidatesTags: ['Learn'],
        // async onQueryStarted(any, { dispatch, queryFulfilled, getState }) {
        //   const state = getState() as RootState;
        //   const patchResult = dispatch(
        //     decksService.util.updateQueryData(
        //       "learnCards",
        //       { },
        //       (draft) => {
        //         draft.items = draft.items.filter((item) => item.id !== id);
        //       },
        //     ),
        //   );
        //
        //   try {
        //     await queryFulfilled;
        //   } catch (error) {
        //     patchResult.undo();
        //   }
        query: data => ({
          body: data,
          method: 'POST',
          url: `v1/decks/${data.cardId}/learn`,
        }),
      }),
      updateDeck: builder.mutation<any, UpdateDeckRequestType>({
        invalidatesTags: ['Decks'],
        query: ({ cover, id, isPrivate, name }) => ({
          body: { cover, isPrivate, name },
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksByIdQuery,
  useGetDecksQuery,
  useLearnCardsQuery,

  useNextQuestionMutation,
  useUpdateDeckMutation,
} = decksService
