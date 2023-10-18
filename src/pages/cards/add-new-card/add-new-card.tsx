import { ChangeEvent, FC, useState } from 'react'

import { Button, Modal, Selected, TextField } from '@/components'
import {
  setAddCardsSelectValue,
  setCardsAnswer,
  setCardsQuestion,
  useCreateCardMutation,
} from '@/services'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './add-new-card.module.scss'

export const questionFormatOptions = [
  { label: 'Text', value: 'text' },
  { label: 'Picture', value: 'picture' },
]

type Props = {
  id: string
}
export const AddNewCard: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const selectValue = useAppSelector(state => state.deckSlice.addCardSelectValue)
  const cardsQuestion = useAppSelector(state => state.deckSlice.cardsQuestion)
  const cardsAnswer = useAppSelector(state => state.deckSlice.cardsAnswer)
  const [addNewCard] = useCreateCardMutation()

  const handleAddNewCard = () => {
    addNewCard({
      answer: cardsAnswer,
      deckId: id,
      question: cardsQuestion,
    })
    handleClose()
  }
  const handleClose = () => {
    setOpen(false)
  }
  const setSelectValue = (value: string) => {
    dispatch(setAddCardsSelectValue(value))
  }

  const handleChangeSelectValue = (newValue: string) => {
    setSelectValue(newValue)
  }
  const setQuestion = (question: string) => {
    dispatch(setCardsQuestion(question))
  }
  const setAnswer = (answer: string) => {
    dispatch(setCardsAnswer(answer))
  }
  const handleChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }
  const handleChangeCardsAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(!open)
        }}
      >
        Add New Card
      </Button>

      <Modal onClose={handleClose} open={open} showCloseButton title={'Add New Card'}>
        <Selected
          label={'Choose a question format'}
          onValueChange={handleChangeSelectValue}
          options={questionFormatOptions}
          value={selectValue}
        ></Selected>
        <TextField
          label={'Question'}
          onChange={handleChangeQuestion}
          value={cardsQuestion}
        ></TextField>
        <TextField
          autoFocus
          label={'Answer'}
          onChange={handleChangeCardsAnswer}
          value={cardsAnswer}
        ></TextField>
        <div className={s.buttonsContainer}>
          <Button onClick={handleClose} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={handleAddNewCard}>Add New Card</Button>
        </div>
      </Modal>
    </>
  )
}
