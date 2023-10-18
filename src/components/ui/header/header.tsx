import React, { FC, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, DrobDownMenuItemRadix, UniversalDropDawnMenu } from '@/components'
import { useGetMeQuery, useLogoutMutation } from '@/services'
import { LogOutIcon } from '@/styles/assets/icons/log-out-icon'
import { UsersIcon } from '@/styles/assets/icons/user-icon'

import s from './header.module.scss'

type Props = {
  children?: ReactNode
  isAuthenticated?: boolean | null | undefined
  logo?: string
  userName?: string
}

export const Header: FC<Props> = ({ children, isAuthenticated, logo }) => {
  const navigate = useNavigate()

  const [logout] = useLogoutMutation()

  const { data: myData } = useGetMeQuery()
  const myNick = myData?.name

  const [, setSelectedItem] = useState('unknown')

  const userEmail = myData?.email

  const setItem = (e: React.MouseEvent<HTMLDivElement>, path: string) => {
    const target = e.target as HTMLDivElement

    setSelectedItem(target.textContent ?? 'unknown')
    navigate(path)
  }
  const handleSignIn = () => {
    navigate('/login')
  }

  return (
    <div className={s.headerContainer}>
      {!isAuthenticated ? (
        <Button onClick={handleSignIn}>Sign in</Button>
      ) : (
        <div className={s.container}>
          <span className={s.logo}>{logo}</span>
          <div className={s.nameAndMenu}>
            <div className={s.nick}>{myNick}</div>
            {children}

            <UniversalDropDawnMenu
              email={userEmail}
              isAvatar
              isTooltip={false}
              nickName={myNick}
              variant={'withAvatar'}
            >
              <DrobDownMenuItemRadix
                icon={<UsersIcon />}
                onSelect={e => setItem(e, '/profile')}
                text={'My Profile'}
              ></DrobDownMenuItemRadix>
              <DrobDownMenuItemRadix
                icon={<LogOutIcon />}
                onSelect={logout}
                text={'Sign Out'}
              ></DrobDownMenuItemRadix>
            </UniversalDropDawnMenu>
          </div>
        </div>
      )}
    </div>
  )
}
