import { ChangeEvent, FC, useState } from 'react'

import { Button, Modal, TextField, UniversalCheckbox } from '@/components'
import { useUpdateDeckMutation } from '@/services'

import s from './edit-deck.module.scss'

type Props = {
  closeEdit: () => void
  id?: string
  isOpenEdit: boolean
  nameForChange?: string

  privates?: boolean
}
export const EditDeck: FC<Props> = ({ closeEdit, id, isOpenEdit, nameForChange, privates }) => {
  const [name, setName] = useState(nameForChange)
  const [isPrivate, setPrivate] = useState(privates)
  const [updateDeck] = useUpdateDeckMutation()
  const handleChangePrivate = (isPrivate: boolean) => {
    setPrivate(isPrivate)
  }
  const handleChangeName = () => {
    updateDeck({
      id,
      isPrivate,
      name,
    })
    closeEdit()
  }
  const handleUpdateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  return (
    <>
      <Modal onClose={closeEdit} open={isOpenEdit} showCloseButton title={'Edit Pack'}>
        {/*<FileInput savePhoto={} photo={} isFullWidth={}></FileInput>*/}
        <TextField label={'Name Pack'} onChange={handleUpdateName} value={name}></TextField>
        <div className={s.checkboxContainer}>
          <UniversalCheckbox
            checked={isPrivate}
            label={'Private pack'}
            onValueChange={handleChangePrivate}
          />
        </div>

        <div className={s.buttonsContainer}>
          <Button onClick={closeEdit} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={handleChangeName}>Save changes</Button>
        </div>
      </Modal>
    </>
  )
}
