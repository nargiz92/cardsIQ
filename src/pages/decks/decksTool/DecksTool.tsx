import { useState } from 'react'

import { Button } from '@/components'
import { DeleteDeck } from '@/pages/decks/delete-deck-page'
import { EditDeck } from '@/pages/decks/edit-deck'
import { Deck } from '@/services'
import { DeleteIcon } from '@/styles/assets/icons/delete-icon'
import { LearnIcon } from '@/styles/assets/icons/learn-icon'
import { PenIcon } from '@/styles/assets/icons/pen-icon'
import { useModal } from '@/utils/hooks'

import s from './DecksTool.module.scss'

type DecksToolType = {
  decksData: Deck
  learnDeck: (id: string) => void
}
export const DecksTool = ({ decksData, learnDeck }: DecksToolType) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const { closeModal, isOpen, openModal } = useModal()
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  return (
    <span className={s.buttonsContainer}>
      <Button onClick={() => learnDeck(decksData.id)} variant={'link2'}>
        <LearnIcon />
      </Button>
      <Button onClick={openModal} variant={'link2'}>
        <PenIcon />
      </Button>
      <EditDeck
        closeEdit={closeModal}
        id={decksData?.id}
        isOpenEdit={isOpen}
        nameForChange={decksData.name}
        privates={decksData?.isPrivate}
      />
      <Button onClick={handleOpenDeleteModal} variant={'link2'}>
        <DeleteIcon />
      </Button>
      <DeleteDeck
        closeDeleteModal={handleCloseDeleteModal}
        deckName={decksData?.name}
        id={decksData?.id}
        isOpenDeleteDecksModal={openDeleteModal}
      />
    </span>
  )
}
