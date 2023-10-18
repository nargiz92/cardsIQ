import { FC, ReactNode } from 'react'

import { Avatar, TooltipDemo, Typography } from '@/components'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './drop-dawn-menu.module.scss'

type Props = {
  children?: ReactNode
  email?: string
  // eslint-disable-next-line no-undef
  icon?: JSX.Element | string
  isAvatar?: boolean
  isTooltip: boolean
  nickName?: string
  variant?: 'withAvatar' | 'withTooltip'
}
export const UniversalDropDawnMenu: FC<Props> = ({
  children,
  email,
  isAvatar,
  isTooltip,
  nickName,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={clsx(s.buttons, isTooltip && s.isTooltip)}>
          {isAvatar ? <Avatar></Avatar> : <TooltipDemo>chose and select</TooltipDemo>}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content alignOffset={10} className={s.dropdownMenuContent} sideOffset={10}>
          <DropdownMenu.Arrow asChild className={s.arrowBox}>
            <div className={s.arrow} />
          </DropdownMenu.Arrow>
          {isAvatar && <DropDownWithAvatar email={email} nickName={nickName} />}
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
type DropDownMenuWithIconType = {
  email?: string
  nickName?: string
}
export const DropDownWithAvatar: FC<DropDownMenuWithIconType> = ({ email, nickName }) => {
  return (
    <DropdownMenu.Item className={s.dropdownMenuItemAvatars}>
      <div className={s.iconContainer}>
        <Avatar></Avatar>
      </div>

      <div className={s.text}>
        <Typography className={s.nickEmail} variant={'subtitle2'}>
          {nickName}
        </Typography>
        <Typography className={s.nickEmail} color={'secondary'} variant={'link2'}>
          {email}
        </Typography>
      </div>
    </DropdownMenu.Item>
  )
}

type DrobdownMenuItemsRadixType = {
  // eslint-disable-next-line no-undef
  icon?: JSX.Element | string
  onSelect: (a: any) => void
  text: string
}
export const DrobDownMenuItemRadix: FC<DrobdownMenuItemsRadixType> = ({ icon, onSelect, text }) => {
  return (
    <DropdownMenu.Item className={s.dropdownMenuItem} onSelect={onSelect}>
      <div className={s.itemIcon}>{icon}</div>
      <Typography variant={'caption'}>{text}</Typography>
    </DropdownMenu.Item>
  )
}
