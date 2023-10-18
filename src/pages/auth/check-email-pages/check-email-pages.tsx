import { useNavigate } from 'react-router-dom'

import { CheckEmail, Header } from '@/components'
import { useGetMeQuery } from '@/services'

export const CheckEmailPages = () => {
  const navigate = useNavigate()
  const { data } = useGetMeQuery()
  const handleBackToSignIn = () => {
    navigate('/login')
  }

  return (
    <>
      <Header />
      <CheckEmail email={data?.email} onClick={handleBackToSignIn} />;
    </>
  )
}
