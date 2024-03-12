import { Button } from '@/components'
import { DeleteDeck } from '@/pages/decks/delete-deck-page'
import { EditDeck } from '@/pages/decks/edit-deck'
import { Deck } from '@/services'
import { DeleteIcon } from '@/styles/assets/icons/delete-icon'
import { LearnIcon } from '@/styles/assets/icons/learn-icon'
import { PenIcon } from '@/styles/assets/icons/pen-icon'

import s from './DecksTool.module.scss'

type DecksToolType = {
  closeEditModal: () => void
  decksData: Deck
  isOpenDeleteDecksModal: boolean
  isOpenEdit: boolean
  learnDeck: (id: string) => void
  openDelete: () => void
  openEditModal: () => void
  setOpenDelete: (value: boolean) => void
}
export const DecksTool = ({
  closeEditModal,
  decksData,

  isOpenDeleteDecksModal,
  isOpenEdit,
  learnDeck,
  openDelete,
  openEditModal,
  setOpenDelete,
}: DecksToolType) => {
  return (
    <span className={s.buttonsContainer}>
      <Button onClick={() => learnDeck(decksData.id)} variant={'link2'}>
        <LearnIcon />
      </Button>
      <Button onClick={openEditModal} variant={'link2'}>
        <PenIcon />
      </Button>
      <EditDeck
        closeEdit={closeEditModal}
        id={decksData?.id}
        isOpenEdit={isOpenEdit}
        nameForChange={decksData.name}
        privates={decksData?.isPrivate}
      />
      <Button onClick={openDelete} variant={'link2'}>
        <DeleteIcon />
      </Button>
      <DeleteDeck
        deckName={decksData?.name}
        id={decksData?.id}
        isOpenDeleteDecksModal={isOpenDeleteDecksModal}
        setOpenDelete={setOpenDelete}
      />
    </span>
  )
}
