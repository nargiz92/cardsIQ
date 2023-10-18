import { FC } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

type Option = {
  label: string
  value: string
}
type Props = {
  defaultValue?: string
  disabled?: boolean
  onValueChange: (value: string) => void
  options: Option[]
  value: string
}
export const RadioGr: FC<Props> = ({ onValueChange, options }) => {
  return (
    <span className={s.radioContent}>
      <RadioGroup.Root className={s.root} defaultValue={'default'} onValueChange={onValueChange}>
        {options.map(option => {
          return (
            <div className={s.container} key={option.value}>
              <div className={s.itemContainer}>
                <RadioGroup.Item className={s.item} key={option.label} value={option.value}>
                  <RadioGroup.Indicator className={s.indicator} />
                </RadioGroup.Item>
              </div>

              <div className={s.label}>{option.label}</div>
            </div>
          )
        })}
      </RadioGroup.Root>
    </span>
  )
}
