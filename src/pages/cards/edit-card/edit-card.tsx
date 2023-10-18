import { ChangeEvent, FC, useState } from 'react'

import { Button, Modal, Selected, TextField } from '@/components'
import { questionFormatOptions } from '@/pages/cards'
import { setAddCardsSelectValue } from '@/services'
import { useUpdateCardMutation } from '@/services/cards-service'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { PenIcon } from '@/styles/assets/icons/pen-icon'
import { useModal } from '@/utils/hooks'

import s from './edit-card.module.scss'

type Props = {
  card?: any
}
export const EditCard: FC<Props> = ({ card }) => {
  const dispatch = useAppDispatch()
  const [answer, setAnswer] = useState(card.answer)
  const [question, setQuestion] = useState(card.question)
  const { closeModal, isOpen, openModal } = useModal()
  const selectValue = useAppSelector(state => state.deckSlice.addCardSelectValue)
  const handleChangeSelectValue = (newValue: string) => {
    setSelectValue(newValue)
  }

  const setSelectValue = (value: string) => {
    dispatch(setAddCardsSelectValue(value))
  }
  const [updateCard] = useUpdateCardMutation()
  const handleEditMode = () => {
    updateCard({
      answer,
      id: card.id,
      question,
    })
    closeModal()
  }
  const handleChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }
  const handleChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }

  return (
    <>
      <Button onClick={openModal} variant={'link2'}>
        <PenIcon />
      </Button>
      <Modal onClose={closeModal} open={isOpen} showCloseButton title={'Edit Card'}>
        <div className={s.container}>
          <Selected
            label={'Choose a question format'}
            onValueChange={handleChangeSelectValue}
            options={questionFormatOptions}
            value={selectValue}
          ></Selected>
          <TextField
            label={'Question'}
            onChange={handleChangeQuestion}
            value={question}
          ></TextField>
          <TextField
            autoFocus
            label={'Answer'}
            onChange={handleChangeAnswer}
            value={answer}
          ></TextField>
        </div>

        <div className={s.buttonsContainer}>
          <Button onClick={closeModal} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={handleEditMode}>Save changes</Button>
        </div>
      </Modal>
    </>
  )
}
