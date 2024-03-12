import { FC } from 'react'

import { Typography } from '@/components'
import { CheckedIcon } from '@/styles/assets/icons'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = Partial<{
  checked: boolean
  disabled?: boolean
  id?: string
  label?: string
  onValueChange: (checked: boolean) => void
  required?: boolean
}>

export const UniversalCheckbox: FC<CheckboxProps> = ({
  checked,
  disabled,
  id,
  label,
  onValueChange,
  required,
}) => {
  return (
    <div className={s.container}>
      <Label.Root className={clsx(s.label, disabled && s.disabled)}>
        <div className={clsx(s.buttonWrapper, disabled && s.disabled)}>
          <CheckboxRadix.Root
            checked={checked}
            className={`${s.root} ${disabled && s.disabled}`}
            disabled={disabled}
            id={id}
            onCheckedChange={onValueChange}
            required={required}
          >
            {checked && (
              <CheckboxRadix.Indicator className={s.indicator}>
                <CheckedIcon />
              </CheckboxRadix.Indicator>
            )}
          </CheckboxRadix.Root>
        </div>
        {label && <Typography variant={'body2'}>{label}</Typography>}
      </Label.Root>
    </div>
  )
}
