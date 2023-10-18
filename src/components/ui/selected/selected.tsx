import { FC } from 'react'

import { Typography } from '@/components'
import * as Select from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './selected.module.scss'

import { DownIcon } from '../../../styles/assets/icons'
export type Option = { label: number; value: string } | { label: string; value: string }

type Props = {
  className?: string
  defaultValue?: string

  disabled?: boolean
  label?: string
  onValueChange: (value: string) => void
  options: Option[]
  placeholder?: string
  required?: boolean
  value: string
  variant?: 'pagination' | 'secondary'
}

export const Selected: FC<Props> = ({
  defaultValue,
  disabled,
  label,
  onValueChange,
  options,

  placeholder,
  required,
  value,
}) => {
  return (
    <form className={s.container}>
      <Typography as={'label'} style={{ color: '#808080' }}>
        {label}
      </Typography>
      <Select.Root
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={onValueChange}
        required={required}
        value={value}
      >
        <Select.Trigger asChild className={clsx(s.selectTrigger)}>
          <div>
            <Select.Value placeholder={placeholder} />
            <Select.Icon className={s.selectIcon}>
              <DownIcon />
            </Select.Icon>
          </div>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={s.selectContent} position={'popper'} sideOffset={-1}>
            <Select.Viewport className={s.selectViewport}>
              {options.map(option => {
                return (
                  <Select.Item className={s.item} key={option.value} value={option.value}>
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                )
              })}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </form>
  )
}
