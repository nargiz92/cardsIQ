import { ChangeEvent, FC, memo, useRef } from 'react'

import { Button } from '@/components'
import defaultAva from '@/styles/assets/icons/image-pen-svgrepo-com.svg'

import s from './file-input.module.scss'

type Props = {
  decksPhoto: Blob | undefined

  setDecksPhoto: (f: Blob | undefined) => void
}
export const FileInput: FC<Props> = memo(({ decksPhoto, setDecksPhoto }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const selectPhotoHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length) {
      const file = e.currentTarget.files[0]

      setDecksPhoto(file)
    }
  }
  // const errorHandler = () => {
  //   setIsAvaBroken(true);
  //   alert("Кривая картинка");
  // };

  return (
    <>
      <div className={s.userPhotoBlock}>
        {decksPhoto ? (
          <div
            className={s.fileImg}
            style={{
              backgroundImage: `url(${URL.createObjectURL(decksPhoto)})`,
            }}
          ></div>
        ) : (
          <img alt={'chosePhoto'} className={s.fileImg} src={defaultAva} />
        )}
      </div>

      <Button className={s.containers} fullWidth onClick={selectPhotoHandler} variant={'secondary'}>
        Change cover
      </Button>

      <input
        accept={'image/*'}
        name={'fileInput'}
        onChange={uploadHandler}
        ref={inputRef}
        style={{ display: 'none' }}
        type={'file'}
      />
    </>
  )
})
