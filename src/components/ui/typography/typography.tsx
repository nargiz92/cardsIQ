import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  className?: string
  color?: 'inherit' | 'primary' | 'secondary'
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'errorMessage'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithoutRef<T>

export function Typography<T extends ElementType = 'p'>({
  as,
  className,
  color = 'inherit',
  variant = 'body1',
  ...otherProps
}: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) {
  const classNames = clsx(s[variant], s[color], className)
  const Component = as || 'p'

  return <Component className={classNames} {...otherProps}></Component>
}
