import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Ranger,
  Tab,
  TabProps,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@/components'
import { Loader } from '@/components/ui/loader/loader'
import { Pagination } from '@/components/ui/pagination'
import { CreateDeck } from '@/pages/decks/createDeck/createDeck'
import { SortedHeaderDecks } from '@/pages/decks/decks-header-table/decks-header'
import { DeleteDeck } from '@/pages/decks/delete-deck-page'
import { EditDeck } from '@/pages/decks/edit-deck'
import { setAuthorId, useGetMeQuery } from '@/services'
import { useGetDecksQuery } from '@/services/decks'
import { deckSlice } from '@/services/decks/deck-slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { CleanIcon } from '@/styles/assets/icons/clear-icon'
import { LearnIcon } from '@/styles/assets/icons/learn-icon'
import { useDebounce } from 'use-debounce'

import styleContainer from '../../components/common/container.module.scss'
import s from './decks.module.scss'
export type Sort = {
  direction: 'asc' | 'desc'
  key: string
}
export type Column = {
  key: string
  sortable: boolean
  title: string
}
const tabs: TabProps[] = [
  { title: 'my', value: 'my' },
  { title: 'all', value: '' },
]

export const options = ['7', '10', '20', '30', '40', '50', '100']

const columns: Column[] = [
  {
    key: 'name',
    sortable: true,
    title: 'Name',
  },
  {
    key: 'cardsCount',
    sortable: true,
    title: 'Cards',
  },
  {
    key: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    sortable: true,
    title: 'Created by',
  },
  {
    key: 'play',
    sortable: false,
    title: '',
  },
]

export const Decks = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage)
  // const ranger = useAppSelector((state) => state.deckSlice.ranger);
  const sliderValues = useAppSelector(state => state.deckSlice.sliderValues)
  const searchByName = useAppSelector(state => state.deckSlice.searchByName)
  const authorId = useAppSelector(state => state.deckSlice.authorId)
  const sort = useAppSelector(state => state.deckSlice.sort)

  const debounceValue = useDebounce(searchByName, 1000)
  const debounceOfRangerValue = useDebounce(sliderValues, 500)
  const [value1, value2] = debounceOfRangerValue[0]
  const handleReset = () => {
    setSliderValues([0, 100])
  }
  const setSort = (sort: Sort) => {
    dispatch(deckSlice.actions.setSort(sort))
  }
  const setValueCommit = (value: number[]) => {
    dispatch(deckSlice.actions.setValueCommit(value))
  }
  const setSliderValues = (values: number[]) => dispatch(deckSlice.actions.setSliderValues(values))
  const setSearch = (search: string) => dispatch(deckSlice.actions.setSearchByName(search))

  const setActiveTab = (value: string) => {
    if (value === 'my' && myData?.id) {
      dispatch(setAuthorId(myData.id))
    } else {
      dispatch(setAuthorId(value))
    }
  }

  const sortedString = useMemo(() => {
    if (!sort.direction) {
      return ''
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const { data: myData } = useGetMeQuery()

  const { currentData: data, isLoading } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage: Number(itemsPerPage),
    maxCardsCount: value2,
    minCardsCount: value1,
    name: debounceValue[0],
    orderBy: sortedString,
  })

  // const setUserId = (id: string) => {
  //   dispatch(deckSlice.actions.setUserId(id));
  // };
  const handleUserDeckClick = (userId: string) => {
    navigate(`/cards/${userId}`)
  }
  const setItemsPerPage = (itemsPerPage: string) =>
    dispatch(deckSlice.actions.setItemsPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(deckSlice.actions.setCurrentPage(currentPage))
  const handlePerPageChange = (newValue: string) => {
    setItemsPerPage(newValue)
  }
  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }
  const handleLearnCards = (id: string) => {
    navigate(`/learn/${id}`)
  }

  if (isLoading) {
    return <Loader />
  }
  const tabsValue = authorId ? 'my' : ''

  return (
    <>
      <div className={`${styleContainer.container} ${s.decksContainer}`}>
        <div className={s.titleAndButton}>
          <Typography variant={'large'}>Pack list</Typography>
          <CreateDeck />
        </div>
        <div className={s.settingsContainer}>
          <div className={s.searchContainer}>
            <TextField
              onChange={e => setSearch(e.currentTarget.value)}
              placeholder={'   Search'}
              type={'search'}
              value={searchByName}
            />
          </div>

          <Tab
            onValueChange={setActiveTab}
            tabLabel={'Show packs cards'}
            tabs={tabs}
            value={tabsValue}
          ></Tab>
          {/*<Tab tabLabel={'test'} value={} />*/}

          <div>
            <Ranger
              onChange={setSliderValues}
              onValueCommit={setValueCommit}
              rangerLabel={'Number of cards'}
              values={sliderValues}
            ></Ranger>
          </div>
          <div className={s.clearFilterButton}>
            <Button onClick={handleReset} variant={'secondary'}>
              <CleanIcon /> Clear filter
            </Button>
          </div>
        </div>

        <Table>
          <SortedHeaderDecks columns={columns} onSort={setSort} sort={sort} />
          <TableBody>
            {data?.items.map(deck => {
              return (
                <TableRow key={deck.id}>
                  <TableCell onClick={() => handleUserDeckClick(deck.id)}>
                    <div className={s.imgAndNameContainer}>
                      {deck?.cover && (
                        <img
                          alt={'imag'}
                          src={deck.cover}
                          style={{ height: '48px', width: '110px' }}
                        />
                      )}

                      {deck.name}
                    </div>
                  </TableCell>
                  <TableCell>{deck.cardsCount}</TableCell>
                  <TableCell>{new Date(deck.updated).toLocaleString('en-GB')}</TableCell>
                  <TableCell>{deck.author.name}</TableCell>
                  <TableCell>
                    {myData?.id === deck.userId ? (
                      <span className={s.buttonsContainer}>
                        <Button onClick={() => handleLearnCards(deck.id)} variant={'link2'}>
                          <LearnIcon />
                        </Button>
                        <EditDeck
                          id={deck.id}
                          nameForChange={deck.name}
                          privates={deck.isPrivate}
                        />
                        <DeleteDeck deckName={deck.name} id={deck.id} />
                      </span>
                    ) : (
                      <Button
                        disabled={deck.cardsCount === 0}
                        onClick={() => handleLearnCards(deck.id)}
                        variant={'link2'}
                      >
                        <LearnIcon />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Pagination
          count={100}
          onChange={handleChangePage}
          onPerPageChange={handlePerPageChange}
          page={currentPage}
          perPage={itemsPerPage}
          perPageOptions={options}
          siblings={3}
        ></Pagination>
      </div>
    </>
  )
}
