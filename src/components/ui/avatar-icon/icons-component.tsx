import { useGetMeQuery } from '@/services'
import { UserPenIcon } from '@/styles/assets/icons/user-icon-change'

import s from './icon.module.scss'

export const Avatar = () => {
  const { data: meData } = useGetMeQuery()

  return (
    <>
      {meData?.avatar ? (
        <img alt={'ava'} className={s.ava} src={meData.avatar} />
      ) : (
        <span>
          {' '}
          <UserPenIcon />{' '}
        </span>
      )}
    </>
  )
}
