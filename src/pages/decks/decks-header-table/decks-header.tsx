import { ComponentPropsWithoutRef, FC } from 'react'

import { TableHead, TableHeadCell, TableRow } from '@/components'
import { setSort } from '@/services'
import { setSortCards } from '@/services/cards-service'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './decks-header.module.scss'

import { DownIcon, UpIcon } from '../../../styles/assets/icons'
import { Column } from '../decks'
export const SortedHeaderDecks: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      isCards: boolean
    },
    'children'
  >
> = ({ columns, isCards, ...restProps }) => {
  const sort = useAppSelector(state => state.deckSlice.sort)
  const sortCards = useAppSelector(state => state.cardsSlice.sortCard)
  const dispatch = useAppDispatch()
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!setSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return dispatch(setSort({ direction: 'asc', key }))
    }

    if (sort.direction === 'desc') {
      return dispatch(setSort(null))
    }

    return dispatch(
      setSort({
        direction: sort?.direction === 'asc' ? 'desc' : 'asc',
        key,
      })
    )
  }
  const handleSortCards = (key: string, sortable?: boolean) => () => {
    if (!setSortCards || !sortable) {
      return
    }

    if (sortCards?.key !== key) {
      return dispatch(setSortCards({ direction: 'asc', key }))
    }

    if (sortCards.direction === 'desc') {
      return dispatch(setSortCards(null))
    }

    return dispatch(
      setSortCards({
        direction: sortCards?.direction === 'asc' ? 'desc' : 'asc',
        key,
      })
    )
  }

  return (
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ key, sortable, title }) => (
          <TableHeadCell
            key={key}
            onClick={isCards ? handleSortCards(key, sortable) : handleSort(key, sortable)}
          >
            <div className={s.container}>
              {title}
              {sort && sort.key === key && (
                <div className={s.iconSort}>
                  {sort.direction === 'asc' ? <UpIcon /> : <DownIcon />}
                </div>
              )}
            </div>
          </TableHeadCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
