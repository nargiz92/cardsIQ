import { FC } from 'react'

import { Button, Modal, Typography } from '@/components'
import { useDeleteCardsMutation } from '@/services/cards-service'
import { DeleteIcon } from '@/styles/assets/icons/delete-icon'
import { useModal } from '@/utils/hooks'

import s from './delect-card.module.scss'
type Props = {
  cardName: string
  id: string
}
export const DeleteCard: FC<Props> = ({ cardName, id }) => {
  const [deleteCard] = useDeleteCardsMutation()
  const { closeModal, isOpen, openModal } = useModal()
  const handleDelete = () => {
    deleteCard({
      id,
    })
  }

  return (
    <>
      <Button onClick={openModal} variant={'link2'}>
        <DeleteIcon />
      </Button>

      <Modal onClose={closeModal} open={isOpen} showCloseButton title={'Delete Card'}>
        <Typography className={s.textContainer} variant={'body1'}>
          {`Do you really want to remove `}
          <Typography variant={'subtitle1'}> {cardName}</Typography>? Cards will be deleted.
        </Typography>

        <div className={s.buttonContainer}>
          <Button onClick={closeModal} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant={'primary'}>
            Delete Card
          </Button>
        </div>
      </Modal>
    </>
  )
}
