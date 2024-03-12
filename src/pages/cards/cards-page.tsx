import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@/components'
import { Loader } from '@/components/ui/loader/loader'
import { Rating } from '@/components/ui/raiting'
import { AddNewCard } from '@/pages/cards/add-new-card'
import { CardsMobTable } from '@/pages/cards/cardsMobTable/CardsMobTable'
import { DeleteCard } from '@/pages/cards/delete-card'
import { EditCard } from '@/pages/cards/edit-card'
import { UserActionMenu } from '@/pages/cards/user-action-menu/user-action-menu'
import { Column, getWindowSize, options } from '@/pages/decks/decks'
import { SortedHeaderDecks } from '@/pages/decks/decks-header-table/decks-header'
import { useGetDecksByIdQuery, useGetMeQuery } from '@/services'
import {
  setCurrentPage,
  setItemsPerPage,
  setSearch,
  useCreateCardMutation,
  useGetDecksCardsQuery,
} from '@/services/cards-service'
import { RootState, useAppDispatch, useAppSelector } from '@/services/store'
import { BackIcon } from '@/styles/assets/icons/back-icon'
import { useDebounce } from 'use-debounce'

import styleCon from '../../components/common/container.module.scss'
import s from './cards.module.scss'

const columns: Column[] = [
  {
    key: 'question',
    sortable: true,
    title: 'Question',
  },
  {
    key: 'answer',
    sortable: true,
    title: 'Answer',
  },
  {
    key: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'grade',
    sortable: false,
    title: 'Grade',
  },
  {
    key: 'tool',
    sortable: false,
    title: '',
  },
]
const columnsFriends: Column[] = [
  {
    key: 'question',
    sortable: true,
    title: 'Question',
  },
  {
    key: 'answer',
    sortable: true,
    title: 'Answer',
  },
  {
    key: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'grade',
    sortable: false,
    title: 'Grade',
  },
]

export const CardsPage = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const sort = useAppSelector((state: RootState) => state.cardsSlice.sortCard)
  const search = useAppSelector((state: RootState) => state.cardsSlice.search)
  const answer = useAppSelector((state: RootState) => state.cardsSlice.answer)
  const currentPage = useAppSelector((state: RootState) => state.cardsSlice.currentPage)
  const itemsPerPage = useAppSelector((state: RootState) => state.cardsSlice.itemsPerPage)
  const debounceValue = useDebounce(search, 1000)
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const windowWidth = useRef(window.innerWidth)
  const [addNewCard, { isSuccess }] = useCreateCardMutation()

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  const sortedString = useMemo(() => {
    if (!sort) {
      return null
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const { data: myData } = useGetMeQuery()
  const { currentData: data, isLoading } = useGetDecksCardsQuery({
    answer: answer,
    currentPage,
    id,
    itemsPerPage: Number(itemsPerPage),
    orderBy: sortedString,
    question: debounceValue[0],
  })

  const { data: dataCards } = useGetDecksByIdQuery({ id })

  // const setSearch = (search: string) => {
  //   dispatch(cardsSlice.actions.setSearch(search))
  // }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.currentTarget.value))
  }
  // const setItemsPerPage = (itemsPerPage: string) =>
  //   dispatch(cardsSlice.actions.setItemsPerPage(itemsPerPage))
  // const setCurrentPage = (currentPage: number) =>
  //   dispatch(cardsSlice.actions.setCurrentPage(currentPage))
  const handlePerPageChange = (newValue: string) => {
    dispatch(setItemsPerPage(newValue))
  }
  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }
  const handleLearnCard = (id: string | undefined) => {
    navigate(`/learn/${id}`)
  }
  const handleBackToDeck = () => {
    navigate('/')
  }

  if (isLoading) {
    return <Loader />
  }
  const isMyCards = myData?.id === dataCards?.userId

  return (
    <div className={`${styleCon.container}`}>
      <Button onClick={handleBackToDeck} variant={'link2'}>
        <BackIcon /> Back to Packs List
      </Button>
      <div className={s.settingsBox}>
        <div className={s.titleMenu}>
          <Typography color={'secondary'} variant={'large'}>
            {dataCards?.name}
          </Typography>
          {isMyCards && (
            <UserActionMenu cardsCaunt={dataCards?.cardsCount} decksTitle={dataCards.name} />
          )}
        </div>
        {isMyCards ? (
          <AddNewCard addNewCard={addNewCard} id={dataCards?.id} />
        ) : (
          <Button disabled onClick={() => handleLearnCard(id)}>
            Learn to Deck
          </Button>
        )}
      </div>
      {dataCards?.cover && (
        <div className={s.imgOfDecks}>
          <img
            alt={'incorrect img'}
            src={dataCards?.cover}
            style={{ height: '107px', width: '170px' }}
          />
        </div>
      )}

      {dataCards?.cardsCount !== 0 || isSuccess ? (
        <>
          <TextField
            onChange={handleSearch}
            placeholder={'   Search'}
            type={'search'}
            value={search}
          />
          {windowSize.innerWidth <= 500 || windowWidth.current <= 500 ? (
            <CardsMobTable data={data} />
          ) : (
            <Table>
              <SortedHeaderDecks columns={isMyCards ? columns : columnsFriends} isCards />
              <TableBody>
                {data?.items.map(card => {
                  return (
                    <TableRow key={card.id}>
                      <TableCell>
                        <div className={s.imgAndTitle}>
                          {card.questionImg && (
                            <img
                              alt={'questionImg'}
                              src={card.questionImg}
                              style={{ height: '48px' }}
                            />
                          )}
                          {card.question}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={s.imgAndTitle}>
                          {card.answerImg && (
                            <img
                              alt={'answerImg'}
                              src={card.answerImg}
                              style={{ height: '60px' }}
                            />
                          )}
                          {card.answer}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(card.updated).toLocaleString('en-GB')}</TableCell>
                      <TableCell>
                        <Rating value={card.grade} />
                      </TableCell>
                      {isMyCards && (
                        <TableCell>
                          <div className={s.buttonsWithIconContainer}>
                            <EditCard card={card} />
                            <DeleteCard cardName={card.question} id={card.id} />
                          </div>
                        </TableCell>
                      )}
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
        </>
      ) : (
        <>
          <Typography>This pack is empty.</Typography>
        </>
      )}
    </div>
  )
}
