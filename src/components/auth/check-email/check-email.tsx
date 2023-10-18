import { FC } from 'react'

import { Button, Card } from '@/components'
import { CheckEmailIcon } from '@/styles/assets/icons/check-email-icon'

import s from './check-email.module.scss'
import styleCommon from '@/components/common/container.module.scss'

type Props = {
  email: string | undefined
  onClick: () => void
}

export const CheckEmail: FC<Props> = ({ email, onClick }) => {
  const onHandlerSubmit = () => {
    onClick()
  }

  return (
    <div className={styleCommon.containerForCards}>
      <Card title={'Check email'}>
        <div className={s.checkEmailContainer}>
          <div className={s.imgContainer}>
            <CheckEmailIcon />
          </div>

          <a className={s.forgotBtn}>We’ve sent an Email with instructions to {email}</a>
        </div>

        <Button fullWidth onClick={onHandlerSubmit} type={'submit'}>
          Back to Sign in
        </Button>
      </Card>
    </div>
  )
}
