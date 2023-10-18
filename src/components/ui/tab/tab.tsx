import { FC, ReactNode } from 'react'

import { Typography } from '@/components'
import * as Tabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tab.module.scss'

export type TabProps = {
  title: string
  value: string
}
type CommonProps = {
  children?: ReactNode
  defaultValue?: string
  fullWidth?: boolean
  onValueChange: (value: string) => void
  tabLabel: string
  tabs: TabProps[]
  value?: string
}

export const Tab: FC<CommonProps> = ({
  children,
  defaultValue,
  fullWidth,
  onValueChange,
  tabLabel,
  tabs,
  value,
}) => {
  return (
    <div>
      <Typography variant={'body2'}>{tabLabel}</Typography>
      <Tabs.Root
        className={s.roots}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        value={value}
      >
        <Tabs.List className={clsx(s.list)}>
          {tabs.map(t => (
            <Tabs.Trigger
              className={clsx(s.tabsTrigger, fullWidth && s.fullWidth)}
              key={t.value}
              value={t.value}
            >
              {t.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {children}
      </Tabs.Root>
    </div>
  )
}

type TabContentProps = {
  children: ReactNode
  value: string
}
export const TabContent: FC<TabContentProps> = ({ children, value }) => {
  return (
    <Tabs.Content className={s.content} value={value}>
      {children}
    </Tabs.Content>
  )
}
