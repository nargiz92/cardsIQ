import { FC } from 'react'

import { Button, Typography } from '@/components'
import { DecksTool } from '@/pages/decks/decksTool/DecksTool'
import { DecksResponse } from '@/services'
import { LearnIcon } from '@/styles/assets/icons/learn-icon'

import s from './decksMob.module.scss'

type DecksMobType = {
  decksData?: DecksResponse
  isMyDeck?: string
  learnDeck: (id: string) => void
  onClickDeck: (value: string) => void
}
export const DecksMobTable: FC<DecksMobType> = ({
  decksData,
  isMyDeck,
  learnDeck,
  onClickDeck,
}) => {
  return (
    <div className={s.box}>
      {decksData?.items.map(deck => {
        return (
          <div className={s.decksBox} key={deck.id}>
            <div className={s.deck} onClick={() => onClickDeck(deck.id)}>
              <Typography variant={'subtitle2'}>Name</Typography>
              <Typography variant={'body1'}>
                {deck.name.length > 10 ? deck.name.slice(0, 8) + `...` : deck.name}
              </Typography>
            </div>
            <div className={s.deck}>
              <Typography variant={'subtitle2'}>Cards</Typography>
              <Typography variant={'body1'}>{deck.cardsCount}</Typography>
            </div>
            <div className={s.deck}>
              <Typography variant={'subtitle2'}>Last Updated</Typography>
              <Typography variant={'body1'}>
                {new Date(deck.updated).toLocaleString('en-GB')}
              </Typography>
            </div>
            <div className={s.deck}>
              <Typography variant={'subtitle2'}>Created by</Typography>
              <Typography variant={'body1'}>{deck.author.name}</Typography>
            </div>
            {isMyDeck === deck.userId ? (
              <DecksTool decksData={deck} learnDeck={learnDeck} />
            ) : (
              <Button
                disabled={deck.cardsCount === 0}
                onClick={() => learnDeck(deck.id)}
                variant={'link2'}
              >
                <LearnIcon />
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}
