import { ChangeEvent, FC, useRef, useState } from 'react'

import { Button, Card, TextField, Typography } from '@/components'
import { LogOutIcon } from '@/styles/assets/icons/log-out-icon'
import { PenIcon } from '@/styles/assets/icons/pen-icon'

import s from './personal-information.module.scss'

type Props = {
  email: string | undefined
  nick: string | undefined
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void
  onClickLogout: () => void
  patchPhoto: () => void
  photo?: any
  savePhoto: (file: File) => void
  valueOfName: string | undefined
}

export const PersonalInformation: FC<Props> = ({
  email,
  nick,
  onChangeName,
  onClickLogout,
  patchPhoto,
  photo,
  savePhoto,
  valueOfName,
}) => {
  const [isShow, setShow] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectPhotoHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const onMainFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files?.[0]

    if (selectedFile) {
      savePhoto(selectedFile)
      patchPhoto()
    }
  }
  const handleOnChange = () => {
    setShow(!isShow)
  }
  const handleSave = () => {
    patchPhoto()
    handleOnChange()
  }

  return (
    <>
      <Card>
        <div className={s.titleContainer}>
          <Typography color={'secondary'} variant={'large'}>
            Personal Information
          </Typography>
        </div>
        <div className={s.checkEmailContainer}>
          <div className={s.userPhotoAndButton}>
            <div className={s.userPhotoBlock}>
              {/*<Avatar />*/}
              <img
                alt={'ava'}
                src={photo}
                style={{ borderRadius: '50%', height: '6rem', width: '6rem' }}
              />
            </div>

            <div className={s.buttonContainer}>
              <Button className={s.buttonPhoto} onClick={selectPhotoHandler} variant={'link2'}>
                <PenIcon />
              </Button>
            </div>

            <input
              accept={'image/*'}
              onChange={onMainFileSelected}
              ref={inputRef}
              style={{ display: 'none' }}
              type={'file'}
            />
          </div>
          <div className={s.changeNameContainer}>
            <Typography color={'secondary'} variant={'h1'}>
              {nick}
            </Typography>
            <b className={s.penClick} onClick={handleOnChange}>
              <PenIcon />
            </b>
          </div>
          {isShow ? (
            <div className={s.containerForSave}>
              <TextField label={'Nickmame'} onChange={onChangeName} value={valueOfName}></TextField>
              <Button fullWidth onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={s.email} style={{ color: '#808080' }} variant={'body2'}>
                {email}
              </Typography>

              <Button fullWidth={false} onClick={onClickLogout} variant={'secondary'}>
                <LogOutIcon />
                Logout
              </Button>
            </div>
          )}
        </div>
      </Card>
    </>
  )
}
