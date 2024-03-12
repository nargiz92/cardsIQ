import { Typography } from '@/components'
import { Rating } from '@/components/ui/raiting'
import { CardsResponse } from '@/services/cards-service/cards-types'

import s from '@/pages/decks/decksMob/decksMob.module.scss'

type CardsMobTableType = {
  data?: CardsResponse
}
export const CardsMobTable = ({ data }: CardsMobTableType) => {
  return (
    <div className={s.box}>
      {data?.items.map(card => {
        return (
          <div className={s.decksBox} key={card.id}>
            <div className={s.deck}>
              <Typography variant={'subtitle2'}>Question</Typography>
              <Typography variant={'body1'}>
                {card.question.length > 10 ? card.question.slice(0, 8) + `...` : card.question}
              </Typography>
            </div>
            <div className={s.deck}>
              <Typography variant={'subtitle2'}>Answer</Typography>
              <Typography variant={'body1'}>{card.answer}</Typography>
            </div>
            <div className={s.deck}>
              <Typography variant={'subtitle2'}>Last Updated</Typography>
              <Typography variant={'body1'}>
                {new Date(card.updated).toLocaleString('en-GB')}
              </Typography>
            </div>
            <div className={s.deck}>
              <Typography variant={'subtitle2'}>Grade</Typography>
              <Typography variant={'body1'}>
                <Rating value={card.grade} />
              </Typography>
            </div>
          </div>
        )
      })}
    </div>
  )
}
