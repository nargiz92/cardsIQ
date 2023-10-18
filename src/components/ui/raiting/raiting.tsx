import { FC } from 'react'

import { EmptyStar } from '@/styles/assets/icons/empty-rating'
import { RatingIcon } from '@/styles/assets/icons/star-icon'

import s from './raiting.module.scss'
type RatingProps = {
  value: number
}
export const Rating: FC<RatingProps> = ({ value }) => {
  const stars = []
  const filledStars = Math.floor(value)
  const hasHalfStar = value % 1 !== 0

  for (let i = 0; i < filledStars; i++) {
    stars.push(<RatingIcon key={i} />)
  }

  if (hasHalfStar) {
    stars.push(<EmptyStar key={'half'} />)
  }

  while (stars.length < 5) {
    stars.push(<EmptyStar key={stars.length} />)
  }

  return <div className={s.stars}>{stars}</div>
}
