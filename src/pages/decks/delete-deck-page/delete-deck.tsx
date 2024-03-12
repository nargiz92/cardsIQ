import { FC } from 'react'

import { Button, Modal, Typography } from '@/components'
import { useDeleteDeckMutation } from '@/services'

import s from './delect-deck.module.scss'
type Props = {
  deckName: string
  id?: string
  isOpenDeleteDecksModal: boolean
  setOpenDelete: (value: boolean) => void
}
export const DeleteDeck: FC<Props> = ({ deckName, id, isOpenDeleteDecksModal, setOpenDelete }) => {
  const [deleteDeck, { isLoading: isDeleteLoading }] = useDeleteDeckMutation()

  const handleDelete = () => {
    deleteDeck({ id: id })
    setOpenDelete(false)
  }
  const handleCloseModal = () => {
    setOpenDelete(false)
  }

  return (
    <>
      <Modal
        onClose={handleCloseModal}
        open={isOpenDeleteDecksModal}
        showCloseButton
        title={'Delete Pack'}
      >
        <Typography className={s.textContainer} variant={'body1'}>
          {`Do you really want to remove ${deckName}`}? All cards will be deleted.
        </Typography>

        <div className={s.buttonContainer}>
          <Button onClick={handleCloseModal} variant={'secondary'}>
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
