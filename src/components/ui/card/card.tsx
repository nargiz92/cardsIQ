import { FC, ReactNode } from 'react'

import s from './card.module.scss'

type CommonProps = {
  children?: ReactNode
  content?: any
  title?: string
}

type Props = CommonProps
export const Card: FC<Props> = ({ children, content, title, ...rest }) => {
  return (
    <div className={s.cardsContent} {...rest}>
      {title && (
        <div className={s.titleConteiner}>
          <h3 className={s.title}>{title}</h3>
        </div>
      )}
      <div className={s.content}>{children}</div>
    </div>
  )
}
