import { ChangeEvent, FC, useState } from 'react'

import { Button, Modal, Selected, TextField } from '@/components'
import { setAddCardsSelectValue } from '@/services'
import { setAnswer, setQuestion } from '@/services/cards-service'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './add-new-card.module.scss'

export const questionFormatOptions = [
  { label: 'Text', value: 'text' },
  { label: 'Picture', value: 'picture' },
]

type Props = {
  addNewCard: any
  id: string
}
export const AddNewCard: FC<Props> = ({ addNewCard, id }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const selectValue = useAppSelector(state => state.deckSlice.addCardSelectValue)
  const cardsQuestion = useAppSelector(state => state.cardsSlice.question)
  const cardsAnswer = useAppSelector(state => state.cardsSlice.answer)

  const handleAddNewCard = () => {
    addNewCard({
      answer: cardsAnswer,
      deckId: id,
      question: cardsQuestion,
    })
    handleClose()
    dispatch(setQuestion(''))
    dispatch(setAnswer(''))
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

  const handleChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestion(e.currentTarget.value))
  }
  const handleChangeCardsAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnswer(e.currentTarget.value))
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
          autoFocus
          label={'Question'}
          onChange={handleChangeQuestion}
          value={cardsQuestion}
        ></TextField>
        <TextField
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
