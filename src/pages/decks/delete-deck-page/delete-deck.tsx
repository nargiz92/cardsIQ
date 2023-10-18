import { FC } from 'react'

import { Button, Modal, Typography } from '@/components'
import { useDeleteDeckMutation } from '@/services'
import { DeleteIcon } from '@/styles/assets/icons/delete-icon'
import { useModal } from '@/utils/hooks'

import s from './delect-deck.module.scss'
type Props = {
  deckName: string
  id: string
}
export const DeleteDeck: FC<Props> = ({ deckName, id }) => {
  const [deleteDeck, { isLoading: isDeleteLoading }] = useDeleteDeckMutation()

  const { closeModal, isOpen, openModal } = useModal()
  const handleDelete = () => {
    deleteDeck({ id: id })
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal} variant={'link2'}>
        <DeleteIcon />
      </Button>

      <Modal onClose={closeModal} open={isOpen} showCloseButton title={'Delete Pack'}>
        <Typography className={s.textContainer} variant={'body1'}>
          {`Do you really want to remove `}
          <Typography variant={'subtitle1'}> {deckName}</Typography>? All cards will be deleted.
        </Typography>

        <div className={s.buttonContainer}>
          <Button onClick={closeModal} variant={'secondary'}>
            Cancel
          </Button>
          <Button disabled={isDeleteLoading} onClick={handleDelete} variant={'primary'}>
            Delete Pack
          </Button>
        </div>
      </Modal>
    </>
  )
}
