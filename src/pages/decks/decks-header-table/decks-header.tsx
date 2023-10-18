import { ComponentPropsWithoutRef, FC } from 'react'

import { TableHead, TableHeadCell, TableRow } from '@/components'

import s from './decks-header.module.scss'

import { DownIcon, UpIcon } from '../../../styles/assets/icons'
import { Column, Sort } from '../decks'
export const SortedHeaderDecks: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      onSort?: (sort: Sort) => void
      sort?: Sort
    },
    'children'
  >
> = ({ columns, onSort, sort, ...restProps }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      return onSort({} as Sort)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  return (
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ key, sortable, title }) => (
          <TableHeadCell key={key} onClick={handleSort(key, sortable)}>
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
