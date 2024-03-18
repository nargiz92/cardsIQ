import { CreateCardRequestType, baseApi } from '@/services'
import {
  CardsResponse,
  GetCardsType,
  UpdateCardRequestType,
} from '@/services/cards-service/cards-types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<any, CreateCardRequestType>({
        invalidatesTags: ['Cards'],
        query: ({ answer, answerImg, deckId, question, questionImg }) => ({
          body: { answer, answerImg, question, questionImg },
          method: 'POST',
          url: `v1/decks/${deckId}/cards`,
        }),
      }),
      deleteCards: builder.mutation<any, { id: string }>({
        invalidatesTags: ['Cards'],

        query: data => {
          return {
            method: 'DELETE',
            url: `v1/cards/${data.id}`,
          }
        },
      }),
      getCards: builder.query<CardsResponse, { id: string }>({
        providesTags: ['Cards'],
        query: data => {
          return {
            method: 'GET',
            url: `v1/cards/${data.id}`,
          }
        },
      }),
      getDecksCards: builder.query<CardsResponse, GetCardsType>({
        providesTags: ['Cards'],
        query: data => {
          const args = { ...data }

          delete args['id']

          return {
            method: 'GET',
            params: args,
            url: `v1/decks/${data.id}/cards`,
          }
        },
      }),
      updateCard: builder.mutation<any, UpdateCardRequestType>({
        // },
        invalidatesTags: ['Cards'],
        // async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        //   const state = getState() as RootState;
        //
        //   try {
        //     const response = await queryFulfilled;
        //
        //     dispatch(
        //         decksService.util.updateQueryData(
        //             "getDecks",
        //             { currentPage: state.deckSlice.currentPage },
        //             (draft) => {
        //               draft.items = [response.data, ...draft.items];
        //             },
        //         ),
        //     );
        //   } catch (error) {
        //     console.log(error);
        //   }
        query: ({ answer, answerImg, id, question, questionImg }) => {
          return {
            body: { answer, answerImg, question, questionImg },
            method: 'PATCH',
            url: `v1/cards/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardsMutation,
  useGetCardsQuery,
  useGetDecksCardsQuery,
  useUpdateCardMutation,
} = cardsService
