import { ComponentProps, KeyboardEvent, forwardRef, useState } from 'react'

import { Typography } from '@/components'
import { CloseEyeIcon } from '@/styles/assets/icons/close-eye-icon'
import { EyeIcon } from '@/styles/assets/icons/eye-icon'
import { SearchIcon } from '@/styles/assets/icons/search-icon'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

export type TextFieldProps = {
  errorMessage?: string
  label?: string

  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: 'password' | 'search' | 'text'
} & ComponentProps<'input'>
export const TextField = /* @__PURE__ */ forwardRef<HTMLInputElement, TextFieldProps>(
  ({ errorMessage, label, placeholder, type, ...rest }, ref) => {
    const [visibility, setVisibility] = useState(false)
    let inputType

    if (type === 'password') {
      inputType = visibility ? 'text' : 'password'
    } else if (type == 'search') {
      inputType = 'search'
    } else {
      inputType = type
    }

    const togglePasswordVisibility = () => {
      setVisibility(prevState => !prevState)
    }
    const passwordIcon = type === 'password' && (
      <span className={clsx(visibility ? s.closeEye : s.eye)} onClick={togglePasswordVisibility}>
        {visibility ? <CloseEyeIcon /> : <EyeIcon />}
      </span>
    )
    const searchIcon = type === 'search' && (
      <span className={clsx(s.search)}>
        <SearchIcon />
      </span>
    )
    const inputClassName = `${s.textField} ${errorMessage ? s.error : ''} ${
      type === 'password' ? s.paddingRight : ''
    } ${type === 'search' ? s.paddingLeft : ''}`

    return (
      <div className={s.container}>
        {label && (
          <Typography as={'label'} style={{ color: '#808080' }} variant={'body1'}>
            {label}
          </Typography>
        )}

        <div className={s.ps}>
          {passwordIcon}
          {searchIcon}

          <input
            className={inputClassName}
            ref={ref}
            type={inputType}
            {...rest}
            placeholder={placeholder}
          />
        </div>
        {errorMessage && (
          <Typography
            className={s.error}
            style={{ fontSize: '13px', margin: '0' }}
            variant={'errorMessage'}
          >
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)
