import { ChangeEvent, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Button,
  DrobDownMenuItemRadix,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  UniversalDropDawnMenu,
} from '@/components'
import { Loader } from '@/components/ui/loader/loader'
import { Rating } from '@/components/ui/raiting'
import { AddNewCard } from '@/pages/cards/add-new-card'
import { DeleteCard } from '@/pages/cards/delete-card'
import { EditCard } from '@/pages/cards/edit-card'
// import { UserActionMenu } from "@/pages/cards/user-action-menu/user-action-menu";
import { Column, Sort, options } from '@/pages/decks/decks'
import { SortedHeaderDecks } from '@/pages/decks/decks-header-table/decks-header'
import { useGetDecksByIdQuery, useGetMeQuery } from '@/services'
import { cardsSlice, useGetDecksCardsQuery } from '@/services/cards-service'
import { RootState, useAppDispatch, useAppSelector } from '@/services/store'
import { BackIcon } from '@/styles/assets/icons/back-icon'
import { DeleteIcon } from '@/styles/assets/icons/delete-icon'
import { LearnIcon } from '@/styles/assets/icons/learn-icon'
import { PenIcon } from '@/styles/assets/icons/pen-icon'
import { useModal } from '@/utils/hooks'
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
]

export const CardsPage = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const sort = useAppSelector((state: RootState) => state.cardsSlice.sortCard)
  const search = useAppSelector((state: RootState) => state.cardsSlice.search)
  const question = useAppSelector((state: RootState) => state.cardsSlice.question)
  const currentPage = useAppSelector((state: RootState) => state.cardsSlice.currentPage)
  const itemsPerPage = useAppSelector((state: RootState) => state.cardsSlice.itemsPerPage)
  const debounceValue = useDebounce(search, 1000)

  const sortedString = useMemo(() => {
    if (!sort.direction) {
      return ''
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const { data: myData } = useGetMeQuery()
  const { currentData: data, isLoading } = useGetDecksCardsQuery({
    answer: debounceValue[0],
    currentPage,
    id,
    itemsPerPage: Number(itemsPerPage),
    orderBy: sortedString,
    question,
  })

  const { data: dataCards } = useGetDecksByIdQuery({ id })

  const setSort = (sort: Sort) => {
    dispatch(cardsSlice.actions.setSortCards(sort))
  }

  const setSearch = (search: string) => {
    dispatch(cardsSlice.actions.setSearch(search))
  }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }
  const setItemsPerPage = (itemsPerPage: string) =>
    dispatch(cardsSlice.actions.setItemsPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(cardsSlice.actions.setCurrentPage(currentPage))
  const handlePerPageChange = (newValue: string) => {
    setItemsPerPage(newValue)
  }
  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }
  const handleLearnCard = (id: string | undefined) => {
    navigate(`/learn/${id}`)
  }
  const handleBackToDeck = () => {
    navigate('/')
  }
  const { openModal } = useModal()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={`${styleCon.container}`}>
      <Button onClick={handleBackToDeck} variant={'link2'}>
        <BackIcon /> Back to Packs List
      </Button>
      <div>
        <Typography color={'secondary'} variant={'large'}>
          {dataCards?.name}
        </Typography>
        {/*<UserActionMenu />*/}
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

      {dataCards?.cardsCount !== 0 ? (
        <>
          {myData?.id === dataCards?.userId ? (
            <>
              <UniversalDropDawnMenu isAvatar={false} isTooltip variant={'withTooltip'}>
                <DrobDownMenuItemRadix
                  icon={<LearnIcon />}
                  onSelect={() => handleLearnCard(dataCards?.id)}
                  text={`Learn`}
                ></DrobDownMenuItemRadix>
                <DrobDownMenuItemRadix
                  icon={<PenIcon />}
                  onSelect={() => openModal()}
                  text={'Edit'}
                ></DrobDownMenuItemRadix>
                <DrobDownMenuItemRadix
                  icon={<DeleteIcon />}
                  onSelect={() => {
                    openModal()
                  }}
                  text={`Delete`}
                ></DrobDownMenuItemRadix>
              </UniversalDropDawnMenu>
              <AddNewCard id={dataCards?.id} />
            </>
          ) : (
            <Button onClick={() => handleLearnCard(id)}>Learn to Deck</Button>
          )}

          <TextField
            onChange={handleSearch}
            placeholder={'   Search'}
            type={'search'}
            value={search}
          />

          <Table>
            <SortedHeaderDecks columns={columns} onSort={setSort} sort={sort} />
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
                          <img alt={'answerImg'} src={card.answerImg} style={{ height: '60px' }} />
                        )}
                        {card.answer}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(card.updated).toLocaleString('en-GB')}</TableCell>
                    <TableCell>
                      <Rating value={card.grade} />
                    </TableCell>
                    {myData?.id === dataCards?.userId && (
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

          <Pagination
            count={100}
            onChange={handleChangePage}
            onPerPageChange={handlePerPageChange}
            page={currentPage}
            perPage={itemsPerPage}
            perPageOptions={options}
            siblings={3}
          ></Pagination>
        </>
      ) : (
        <>
          <Typography>This pack is empty.</Typography>
          {myData?.id === dataCards?.userId ? (
            <AddNewCard id={dataCards?.id} />
          ) : (
            <Button disabled onClick={() => handleLearnCard(id)}>
              Learn to Deck
            </Button>
          )}
        </>
      )}
    </div>
  )
}
