import { Navigate } from 'react-router-dom'

import { ForgotPassword, Header } from '@/components'
import { useRecoverPasswordMutation } from '@/services'

export const ForgotPasswordPage = () => {
  const [passwordsRecover, { isSuccess }] = useRecoverPasswordMutation()

  const handleRecoverPassword = (data: any) => {
    passwordsRecover(data)
  }

  if (isSuccess) {
    return <Navigate to={'/check-email'} />
  }

  return (
    <>
      <Header />
      <ForgotPassword onSubmit={handleRecoverPassword}></ForgotPassword>
    </>
  )
}
