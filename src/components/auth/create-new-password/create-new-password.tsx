import { FC, KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Card, ControlledTextField } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './create-new-password.module.scss'
import styleCommon from '@/components/common/container.module.scss'

type FormValues = {
  password: string
}
interface CreateNewPasswordProps {
  onSubmit: (data: LoginFormSchema) => void
}
type LoginFormSchema = z.infer<typeof loginSchema>
const loginSchema = z.object({
  password: z.string().min(3),
})

export const CreateNewPassword: FC<CreateNewPasswordProps> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onHandlerSubmit = (data: LoginFormSchema) => {
    onSubmit(data)
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit(onHandlerSubmit)()
    }
  }

  return (
    <div className={styleCommon.containerForCards}>
      <Card title={'Creat new password'}>
        <form onKeyDown={handleKeyPress} onSubmit={handleSubmit(onHandlerSubmit)}>
          <ControlledTextField
            control={control}
            errorMessage={errors.password?.message}
            label={'Password'}
            name={'password'}
            type={'password'}
          />

          <div className={s.forgotBtnContainer}>
            <a className={s.forgotBtn}>
              Create new password and we will send you further instruction to email
            </a>
          </div>

          <Button fullWidth type={'submit'}>
            Create New Password
          </Button>
        </form>
      </Card>
    </div>
  )
}
