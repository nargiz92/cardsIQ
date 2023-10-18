import { ChangeEvent, FC, useState } from 'react'

import { Button, Modal, TextField, UniversalCheckbox } from '@/components'
import { useUpdateDeckMutation } from '@/services'
import { PenIcon } from '@/styles/assets/icons/pen-icon'
import { useModal } from '@/utils/hooks'

import s from './edit-deck.module.scss'

type Props = {
  id: string
  nameForChange: string
  privates: boolean
}
export const EditDeck: FC<Props> = ({ id, nameForChange, privates }) => {
  const [name, setName] = useState(nameForChange)
  const [isPrivate, setPrivate] = useState(privates)
  const { closeModal, isOpen, openModal } = useModal()
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
    closeModal()
  }
  const handleUpdateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  return (
    <>
      <Button onClick={openModal} variant={'link2'}>
        <PenIcon />
      </Button>
      <Modal onClose={closeModal} open={isOpen} showCloseButton title={'Edit Pack'}>
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
          <Button onClick={closeModal} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={handleChangeName}>Save changes</Button>
        </div>
      </Modal>
    </>
  )
}
