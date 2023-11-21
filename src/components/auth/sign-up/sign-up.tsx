import { FC, KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, Card, ControlledTextField } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'
import styleCommon from '@/components/common/container.module.scss'

type FormValues = {
  email: string

  password: string
  passwordConfirmation: string
}
interface Props {
  onSubmit: (data: LoginFormSchema) => void
}
const loginSchema = z
  .object({
    email: z.string().email().max(30).default(''),
    password: z
      .string()
      .min(3)
      .max(20)
      .refine(value => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: 'Password must contain at least one punctuation symbol',
      })
      .default(''),
    passwordConfirmation: z.string().nonempty('Confirm your password'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password do not match',
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

type LoginFormSchema = z.infer<typeof loginSchema>
export const SignUp: FC<Props> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(loginSchema),
  })
  const navigate = useNavigate()
  const onHandlerSubmit = (data: LoginFormSchema) => {
    onSubmit(data)
  }
  const handleSignIn = () => {
    navigate('/login')
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit(onHandlerSubmit)()
    }
  }

  return (
    <div className={styleCommon.containerForCards}>
      <Card title={'Sign up'}>
        <form onKeyDown={handleKeyPress} onSubmit={handleSubmit(onHandlerSubmit)}>
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

          <div className={s.confirmContainer}>
            <ControlledTextField
              control={control}
              errorMessage={errors.password?.message}
              label={'Confirm password'}
              name={'passwordConfirmation'}
              type={'password'}
            />
          </div>

          <Button fullWidth type={'submit'}>
            Sign up
          </Button>
        </form>
        <>
          <div className={s.haveAccountContainer}>
            <a className={s.haveAccount}>Already have an account?</a>
          </div>
          <div className={s.buttonContainer}>
            <Button className={s.buttonUp} onClick={handleSignIn} variant={'link'}>
              Sign in?
            </Button>
          </div>
        </>
      </Card>
    </div>
  )
}
