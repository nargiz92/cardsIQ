import { FC } from 'react'

import { Button, Modal, Typography } from '@/components'
import { useDeleteDeckMutation } from '@/services'

import s from './delect-deck.module.scss'
type Props = {
  closeDeleteModal: () => void
  deckName: string
  id?: string
  isOpenDeleteDecksModal: boolean
}
export const DeleteDeck: FC<Props> = ({
  closeDeleteModal,
  deckName,
  id,
  isOpenDeleteDecksModal,
}) => {
  const [deleteDeck, { isLoading: isDeleteLoading }] = useDeleteDeckMutation()

  const handleDelete = () => {
    deleteDeck({ id: id })
    closeDeleteModal()
  }

  return (
    <>
      <Modal
        onClose={closeDeleteModal}
        open={isOpenDeleteDecksModal}
        showCloseButton
        title={'Delete Pack'}
      >
        <Typography className={s.textContainer} variant={'body1'}>
          {`Do you really want to remove ${deckName}`}? All cards will be deleted.
        </Typography>

        <div className={s.buttonContainer}>
          <Button onClick={closeDeleteModal} variant={'secondary'}>
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
