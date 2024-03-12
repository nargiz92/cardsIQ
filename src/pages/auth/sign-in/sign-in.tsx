import { Navigate } from 'react-router-dom'

import { Header, LoginForm } from '@/components'
import { Loader } from '@/components/ui/loader/loader'
import { useGetMeQuery, useLoginMutation } from '@/services'

export const SignInPage = () => {
  const [login] = useLoginMutation()

  const { data: me, isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) {
    return <Loader />
  }
  if (me && me?.success !== false) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <Header />
      <LoginForm onSubmit={login} />
    </>
  )
}
