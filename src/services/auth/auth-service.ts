import { LoginArgs, LoginResponse, MeResponseType, UpdatedResponse, baseApi } from '@/services'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<MeResponseType | null, void>({
      extraOptions: {
        maxRetries: 0,
      },
      providesTags: ['Me'],
      async queryFn(_name, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          method: 'GET',
          url: `v1/auth/me`,
        })

        if (result.error) {
          // but refetch on another error
          return { data: { success: false } as MeResponseType }
        }

        return { data: result.data as MeResponseType }
      },
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      invalidatesTags: ['Me'],
      query: data => ({
        body: data,
        method: 'POST',
        url: `v1/auth/login`,
      }),
    }),
    logout: builder.mutation<void, void>({
      invalidatesTags: ['Me'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authService.util.updateQueryData('getMe', undefined, () => {
            return null
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
      query: () => {
        return {
          method: 'POST',
          url: `v1/auth/logout`,
        }
      },
    }),
    recoverPassword: builder.mutation<void, void>({
      invalidatesTags: ['Me'],
      query: data => ({
        body: data,
        method: 'POST',
        url: `v1/auth/recover-password`,
      }),
    }),
    signUp: builder.mutation<any, any>({
      invalidatesTags: ['Me'],
      query: data => ({
        body: data,
        method: 'POST',
        url: `v1/auth/sign-up`,
      }),
    }),
    updatedUserData: builder.mutation<UpdatedResponse, FormData>({
      invalidatesTags: ['Me'],
      query: data => ({
        body: data,
        method: 'PATCH',
        url: `v1/auth/me`,
      }),
    }),
  }),
})

export const {
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRecoverPasswordMutation,
  useSignUpMutation,
  useUpdatedUserDataMutation,
} = authService
