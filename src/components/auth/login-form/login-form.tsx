import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, Card, ControlledCheckbox, ControlledTextField } from '@/components'
import { loginSchema } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './login-form.module.scss'
import styleCommon from '@/components/common/container.module.scss'

type FormValues = {
  email: string

  password: string
  rememberMe: boolean
}
type LoginFormSchema = z.infer<typeof loginSchema>
interface Props {
  onSubmit: (data: LoginFormSchema) => void
}
export const LoginForm: FC<Props> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })
  const navigate = useNavigate()
  const onHandlerSubmit = (data: LoginFormSchema) => {
    onSubmit(data)
  }

  const handleSignUp = () => {
    navigate('/signUp')
  }
  const handleForgotPassword = () => {
    navigate('/forgot_password')
  }

  return (
    <div className={styleCommon.containerForCards}>
      <Card title={'Sign in'}>
        <form onSubmit={handleSubmit(onHandlerSubmit)}>
          {/*<DevTool control={control} />*/}
          <div className={s.emailContainer}>
            <ControlledTextField
              control={control}
              errorMessage={errors.email?.message}
              label={'Email'}
              name={'email'}
            />
          </div>
          <div className={s.passwordContainer}>
            <ControlledTextField
              control={control}
              errorMessage={errors.password?.message}
              label={'Password'}
              name={'password'}
              type={'password'}
            />
          </div>

          <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
          <div className={s.forgotBtnContainer}>
            <Button onClick={handleForgotPassword} variant={'link'}>
              Forgot password?
            </Button>
          </div>

          <Button fullWidth type={'submit'}>
            Sign in
          </Button>
        </form>
        <div className={s.haveAccountContainer}>
          <a className={s.haveAccount}>{"Don't have an account?"}</a>
        </div>
        <div className={s.signUpContainer}>
          <Button onClick={handleSignUp} variant={'link2'}>
            Sign up?
          </Button>
        </div>
      </Card>
    </div>
  )
}
