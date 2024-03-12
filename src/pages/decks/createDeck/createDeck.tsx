import { useState } from 'react'

import { Button, Modal, TextField, UniversalCheckbox } from '@/components'
import { FileInput } from '@/components/ui/file-input'
import { useCreateDeckMutation } from '@/services/decks'
import { deckSlice } from '@/services/decks/deck-slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { useModal } from '@/utils/hooks'

import s from './create-deck.module.scss'

export const CreateDeck = () => {
  const dispatch = useAppDispatch()
  const [decksPhoto, setDecksPhoto] = useState<Blob | undefined>()
  const isPrivates = useAppSelector(state => state.deckSlice.isPrivates)
  const decksName = useAppSelector(state => state.deckSlice.decksName)
  const { closeModal, isOpen, openModal } = useModal()
  const [createDeck] = useCreateDeckMutation()

  const setDecksName = (name: string) => {
    dispatch(deckSlice.actions.setDecksName(name))
  }

  const setPrivates = (isPrivates: boolean) => dispatch(deckSlice.actions.setPrivate(isPrivates))
  const handleCreateDeckClick = () => {
    const formData = new FormData()

    formData.append('name', decksName)
    formData.append('isPrivate', isPrivates.toString())
    if (decksPhoto) {
      formData.append('cover', decksPhoto)
    }
    createDeck(formData)
    //
    // createDeck({ name: decksName, isPrivate: isPrivates, cover: decksPhoto })
    //   .unwrap()
    //   .catch((err) => {
    //     alert(err?.data?.errorMessages[0].message);
    //   });
    setDecksName('')
    closeModal()
    setDecksPhoto(decksPhoto)
  }
  const error = decksName.length < 3 || decksName.length >= 30

  return (
    <>
      <Button onClick={openModal}>Add New Pack</Button>

      <Modal
        className={s.modalContainer}
        onClose={closeModal}
        open={isOpen}
        showCloseButton
        title={'Add New Pack'}
      >
        <div className={s.fileInputContainer}>
          <FileInput decksPhoto={decksPhoto} setDecksPhoto={setDecksPhoto} />
        </div>
        <div className={s.nameContainer}>
          <TextField
            autoFocus
            errorMessage={
              decksName.length >= 30 ? 'Name must be shorter than or equal to 30 characters' : ''
            }
            label={'Name Pack'}
            onChange={e => setDecksName(e.currentTarget.value)}
            value={decksName}
          />
        </div>
        <div>
          <UniversalCheckbox
            checked={isPrivates}
            label={'Private pack'}
            onValueChange={setPrivates}
          ></UniversalCheckbox>
        </div>

        <div className={s.buttonContainer}>
          <Button onClick={closeModal} variant={'secondary'}>
            Cansel
          </Button>
          <Button disabled={error} onClick={handleCreateDeckClick}>
            Add New Pack
          </Button>
        </div>
      </Modal>
    </>
  )
}
