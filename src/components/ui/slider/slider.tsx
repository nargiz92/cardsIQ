import { FC } from 'react'

import { Typography } from '@/components'
import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

type Props = {
  onChange: (values: number[]) => void
  onValueCommit: (value: number[]) => void
  rangerLabel?: string
  values: number[]
}
export const Ranger: FC<Props> = ({ onChange, onValueCommit, rangerLabel, values }) => {
  return (
    <>
      <Typography variant={'body2'}>{rangerLabel}</Typography>
      <form className={s.ranger}>
        <span className={s.number} id={'hw11-value-1'}>
          {values[0]}
        </span>
        <Slider.Root
          className={s.SliderRoot}
          defaultValue={[0, 100]}
          max={100}
          minStepsBetweenThumbs={1}
          onValueChange={onChange}
          onValueCommit={onValueCommit}
          step={1}
          value={values}
        >
          <Slider.Track className={s.SliderTrack}>
            <Slider.Range className={s.SliderRange} />
          </Slider.Track>
          <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
          <Slider.Thumb aria-label={'Volume .'} className={s.SliderThumb} />
        </Slider.Root>
        <span className={s.number} id={'hw11-value-1'}>
          {values[1]}
        </span>
      </form>
    </>
  )
}
