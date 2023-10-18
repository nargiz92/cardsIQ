import { useState } from 'react'

import { RadioGr } from '@/components'
import { Meta } from '@storybook/react'

const options = [
  {
    label: 'Apple',
    value: 'apple',
  },
  {
    label: 'Banana',
    value: 'banana',
  },
  {
    label: 'Blueberry',
    value: 'blueberry',
  },
  {
    label: 'Grapes',
    value: 'grapes',
  },
  {
    label: 'Pineapple',
    value: 'pineapple',
  },
]

export default {
  component: RadioGr,
  title: 'Components/RadioGroup',
} as Meta<typeof RadioGr>

export const Default = {
  args: {
    disabled: false,
    options,
  },

  render: (args: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(null)

    return (
      <>
        <RadioGr {...args} onChange={setValue} value={value} />
        <div>Selected value: {value}</div>
      </>
    )
  },
}

export const DefaultDisabled = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
}
