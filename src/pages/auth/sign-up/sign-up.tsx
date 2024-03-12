import { useNavigate } from 'react-router-dom'

import { Header, SignUp } from '@/components'
import { useSignUpMutation } from '@/services'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const [signUp, { isSuccess }] = useSignUpMutation()
  const handleSignUp = (data: any) => {
    const { passwordConfirmation, ...rest } = data

    signUp(rest)
    if (isSuccess) {
      navigate('/login')
    }
    // if (isSuccess) return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Header />
      <SignUp onSubmit={handleSignUp}></SignUp>
    </>
  )
}
