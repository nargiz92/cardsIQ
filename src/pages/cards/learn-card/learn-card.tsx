import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Card, RadioGr, Typography } from '@/components'
import { Loader } from '@/components/ui/loader/loader'
import {
  setSelectedValue,
  setShowAnswer,
  setShowButton,
  useGetDecksByIdQuery,
  useLearnCardsQuery,
  useNextQuestionMutation,
} from '@/services'
import { useAppSelector } from '@/services/store'
import { BackIcon } from '@/styles/assets/icons/back-icon'

import s from './learn-card.module.scss'
import styleCon from '@/components/common/container.module.scss'

const options = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]

export const LearnCardPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const showButton = useAppSelector(state => state.deckSlice.showButton)
  const showAnswer = useAppSelector(state => state.deckSlice.showAnswer)
  const dispatch = useDispatch()
  const radioSelectedValue = useAppSelector(state => state.deckSlice.radioSelectedValue)
  const { data: packsData } = useGetDecksByIdQuery({ id })
  const [previosData] = useNextQuestionMutation()

  const { currentData: data, isLoading } = useLearnCardsQuery({
    id,
  })

  const handleShowAnswerClick = () => {
    dispatch(setShowButton(false))
    dispatch(setShowAnswer(true))
  }
  const handleRadioChange = (value: string) => {
    dispatch(setSelectedValue(value))
  }
  const handleNextQuestionClick = async () => {
    if (data) {
      await previosData({
        cardId: data.id,
        grade: +radioSelectedValue,
      }).unwrap()
    }
    dispatch(setShowAnswer(false))
    dispatch(setShowButton(true))
  }
  const handleBackToDeck = () => {
    navigate('/')
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={`${styleCon.container}`}>
      <Button onClick={handleBackToDeck} variant={'link2'}>
        <BackIcon /> Back to Packs List
      </Button>
      <span className={s.learnContainer}>
        <Card>
          <Typography variant={'large'}>Learn: {packsData?.name}</Typography>
          <div>
            <Typography variant={'h3'}>Question: {data?.question}</Typography>
            <Typography style={{ color: '#808080' }} variant={'body1'}>
              Number of attempts to answer the question:{data?.shots}
            </Typography>
          </div>
          {showButton && (
            <Button fullWidth onClick={handleShowAnswerClick}>
              Show Answer
            </Button>
          )}

          {showAnswer && (
            <>
              <span className={s.answerContainer}>
                <Typography style={{ color: '#fff' }} variant={'h3'}>
                  Answer:
                </Typography>
                <Typography variant={'body1'}>{data?.answer}</Typography>
              </span>

              <Typography style={{ color: '#fff' }} variant={'h3'}>
                Rate yourself:
              </Typography>

              <RadioGr
                defaultValue={options[0].value}
                onValueChange={handleRadioChange}
                options={options}
                value={radioSelectedValue}
              ></RadioGr>
              <div>
                <Button fullWidth onClick={handleNextQuestionClick}>
                  Next Question
                </Button>
              </div>
            </>
          )}
        </Card>
      </span>
    </div>
  )
}
