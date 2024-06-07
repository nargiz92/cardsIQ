import { ChangeEvent, useState } from 'react'

import { PersonalInformation } from '@/components'
import { useGetMeQuery, useLogoutMutation, useUpdatedUserDataMutation } from '@/services'

import s from './personal-page.module.scss'

export const PersonalInfoPage = () => {
  const { data: me } = useGetMeQuery()
  const [nick, setNick] = useState<string | undefined>(me?.name)
  const [logout] = useLogoutMutation()

  const [userDataForUpdate] = useUpdatedUserDataMutation()

  const handleLogout = () => {
    logout()
  }
  const setNewName = (name: string) => {
    setNick(name)
  }
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value)
  }
  const patchData = (file?: File) => {
    const formData = new FormData()

    if (file) {
      formData.append('avatar', file)
    }
    if (nick) {
      formData.append('name', nick)
    }
    userDataForUpdate(formData)
  }

  return (
    <div className={s.container}>
      <PersonalInformation
        email={me?.email}
        nick={me?.name}
        onChangeName={handleChangeName}
        onClickLogout={handleLogout}
        patchPhoto={patchData}
        photo={me?.avatar}
        valueOfName={nick}
      />
    </div>
  )
}
