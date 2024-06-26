import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { DrobDownMenuItemRadix, UniversalDropDawnMenu } from '@/components'
import { DeleteDeck } from '@/pages/decks/delete-deck-page'
import { EditDeck } from '@/pages/decks/edit-deck'
import { DeleteIcon } from '@/styles/assets/icons/delete-icon'
import { LearnIcon } from '@/styles/assets/icons/learn-icon'
import { PenIcon } from '@/styles/assets/icons/pen-icon'
import { useModal } from '@/utils/hooks'
type UserActionMenuProps = {
  cardsCount: number
  decksTitle: string
}
export const UserActionMenu = ({ cardsCount, decksTitle }: UserActionMenuProps) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { closeModal: closeEditModal, isOpen: isOpenEdit, openModal: openEditModal } = useModal()
  const [isOpenDeleteDecksModal, setOpenDelete] = useState(false)

  const handleLearnCard = () => {
    if (cardsCount !== 0) {
      navigate(`/learn/${id}`)
    }
  }
  const handleCloseDeleteModal = () => setOpenDelete(false)

  return (
    <>
      <UniversalDropDawnMenu isAvatar={false} isTooltip variant={'withTooltip'}>
        <DrobDownMenuItemRadix
          icon={<LearnIcon />}
          onSelect={handleLearnCard}
          text={`Learn`}
        ></DrobDownMenuItemRadix>
        <DrobDownMenuItemRadix
          icon={<PenIcon />}
          onSelect={() => openEditModal()}
          text={'Edit'}
        ></DrobDownMenuItemRadix>
        <DrobDownMenuItemRadix
          icon={<DeleteIcon />}
          onSelect={() => {
            setOpenDelete(true)
          }}
          text={`Delete`}
        ></DrobDownMenuItemRadix>
      </UniversalDropDawnMenu>
      <EditDeck
        closeEdit={closeEditModal}
        id={id}
        isOpenEdit={isOpenEdit}
        nameForChange={decksTitle}
      />
      <DeleteDeck
        closeDeleteModal={handleCloseDeleteModal}
        deckName={decksTitle}
        id={id}
        isOpenDeleteDecksModal={isOpenDeleteDecksModal}
      />
    </>
  )
}
