import { ReactNode } from 'react'

import { TooltipIcon } from '@/styles/assets/icons/tooltip-icon'
import * as Tooltip from '@radix-ui/react-tooltip'

import s from './tooltip.module.scss'

type Props = {
  children?: ReactNode
}
export const TooltipDemo = ({ children }: Props) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <TooltipIcon />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={s.tooltipContent} side={'top'} sideOffset={5}>
            {children}
            <Tooltip.Arrow className={s.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
