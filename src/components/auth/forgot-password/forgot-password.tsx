import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, Card, ControlledTextField } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgot-password.module.scss'
import styleCommon from '@/components/common/container.module.scss'

type FormValues = {
  email: string
}
type LoginFormSchema = z.infer<typeof loginSchema>
const loginSchema = z.object({
  email: z.string().email(),
})

interface Props {
  onSubmit: (data: LoginFormSchema) => void
}
export const ForgotPassword: FC<Props> = ({ onSubmit }) => {
  const navigate = useNavigate()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onHandlerSubmit = (data: LoginFormSchema) => {
    onSubmit(data)
  }
  const handleTryLog = () => {
    navigate('/login')
  }

  return (
    <div className={styleCommon.containerForCards}>
      <Card title={'Forgot your password?'}>
        <form onSubmit={handleSubmit(onHandlerSubmit)}>
          <div className={s.inputContainer}>
            <ControlledTextField
              control={control}
              errorMessage={errors.email?.message}
              label={'Email'}
              name={'email'}
            />
          </div>

          <div className={s.forgotBtnContainer}>
            <a className={s.forgotBtn}>
              Enter your email address and we will send you further instruction
            </a>
          </div>

          <Button fullWidth type={'submit'}>
            Send Instructions
          </Button>
          <div className={s.haveAccountContainer}>
            <a className={s.haveAccount}>Did you remember your password?</a>
          </div>
        </form>
        <div className={s.buttonContainer}>
          <Button className={s.buttonUp} onClick={handleTryLog} variant={'link'}>
            Try logging in?
          </Button>
        </div>
      </Card>
    </div>
  )
}
