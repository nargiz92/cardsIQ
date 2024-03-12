import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
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
import { DecksMobTable } from '@/pages/decks/decksMob/decksMob'
import { DecksTool } from '@/pages/decks/decksTool/DecksTool'
import {
  setAuthorId,
  setCurrentDecksPage,
  setItemsPerPage,
  setSearchByName,
  setSliderValues,
  useGetMeQuery,
} from '@/services'
import { useGetDecksQuery } from '@/services/decks'
import { deckSlice } from '@/services/decks/deck-slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { CleanIcon } from '@/styles/assets/icons/clear-icon'
import { LearnIcon } from '@/styles/assets/icons/learn-icon'
import { useModal } from '@/utils/hooks'
import { useDebounce } from 'use-debounce'

import styleContainer from '../../components/common/container.module.scss'
import s from './decks.module.scss'
export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null
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
    sortable: false,
    title: 'Created by',
  },
  {
    key: 'play',
    sortable: false,
    title: '',
  },
]

export function getWindowSize() {
  const { innerHeight, innerWidth } = window

  return { innerHeight, innerWidth }
}
export const Decks = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.deckSlice.currentDecksPage)
  const sliderValues = useAppSelector(state => state.deckSlice.sliderValues)
  const searchByName = useAppSelector(state => state.deckSlice.searchByName)
  const authorId = useAppSelector(state => state.deckSlice.authorId)
  const sort = useAppSelector(state => state.deckSlice.sort)
  const debounceValue = useDebounce(searchByName, 1000)
  const debounceOfRangerValue = useDebounce(sliderValues, 500)
  const [value1, value2] = debounceOfRangerValue[0]
  const { closeModal: closeEditModal, isOpen: isOpenEdit, openModal: openEditModal } = useModal()
  const [isOpenDeleteDecksModal, setOpenDelete] = useState(false)
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const windowWidth = useRef(window.innerWidth)

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  const handleReset = () => {
    dispatch(setSliderValues([0, 100]))
  }
  const setValueCommit = (value: number[]) => {
    dispatch(deckSlice.actions.setValueCommit(value))
  }
  const handleChangeRanger = (values: number[]) => {
    dispatch(setSliderValues(values))
  }
  const setActiveTab = (value: string) => {
    if (value === 'my' && myData?.id) {
      dispatch(setAuthorId(myData.id))
    } else {
      dispatch(setAuthorId(value))
    }
  }

  const sortedString = useMemo(() => {
    if (!sort) {
      return null
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

  const handleUserDeckClick = (userId: string) => {
    navigate(`/cards/${userId}`)
  }

  const handlePerPageChange = (newValue: string) => {
    dispatch(setItemsPerPage(newValue))
  }
  const handleChangePage = (page: number) => {
    dispatch(setCurrentDecksPage(page))
  }
  const handleLearnCards = (id: string) => {
    navigate(`/learn/${id}`)
  }
  const handleOpenModal = () => {
    setOpenDelete(true)
  }

  if (isLoading) {
    return <Loader />
  }
  const tabsValue = authorId ? 'my' : ''
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchByName(e.currentTarget.value))
  }

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
              onChange={handleSearch}
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

          <div>
            <Ranger
              onChange={handleChangeRanger}
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
        {windowSize.innerWidth <= 500 || windowWidth.current <= 500 ? (
          <DecksMobTable
            closeEditModal={closeEditModal}
            decksData={data}
            isMyDeck={myData?.id}
            isOpenDeleteDecksModal={isOpenDeleteDecksModal}
            isOpenEdit={isOpenEdit}
            learnDeck={handleLearnCards}
            onClickDeck={handleUserDeckClick}
            openDelete={handleOpenModal}
            openEditModal={openEditModal}
            setOpenDelete={setOpenDelete}
          />
        ) : (
          <Table>
            <SortedHeaderDecks columns={columns} isCards={false} />
            <TableBody>
              {data?.items.map(deck => {
                return (
                  <TableRow key={deck.id}>
                    <TableCell className={s.decksName} onClick={() => handleUserDeckClick(deck.id)}>
                      <div className={s.imgAndNameContainer}>
                        {deck?.cover && <img alt={'imag'} src={deck.cover} />}

                        {deck.name.length > 10 ? deck.name.slice(0, 8) + `...` : deck.name}
                      </div>
                    </TableCell>
                    <TableCell>{deck.cardsCount}</TableCell>
                    <TableCell>{new Date(deck.updated).toLocaleString('en-GB')}</TableCell>
                    <TableCell>{deck.author.name}</TableCell>
                    <TableCell>
                      {myData?.id === deck.userId ? (
                        <DecksTool
                          closeEditModal={closeEditModal}
                          decksData={deck}
                          isOpenDeleteDecksModal={isOpenDeleteDecksModal}
                          isOpenEdit={isOpenEdit}
                          learnDeck={handleLearnCards}
                          openDelete={handleOpenModal}
                          openEditModal={openEditModal}
                          setOpenDelete={setOpenDelete}
                        />
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
        )}
        <Pagination
          count={100}
          onChange={handleChangePage}
          onPerPageChange={handlePerPageChange}
          page={currentPage}
          perPage={itemsPerPage}
          perPageOptions={options}
          siblings={3}
        />
      </div>
    </>
  )
}
