import { useState } from 'react'

import { Meta, Story } from '@storybook/react'

import { Ranger } from './slider'
type Props = {
  onChange: (values: number[]) => void
  onValueCommit: (value: number[]) => void
  values: number[]
}
export default {
  component: Ranger,
  title: 'Ranger',
} as Meta

const Template: Story<Props> = args => {
  const [values, setValues] = useState<number[]>(args.values)

  const handleChange = (newValues: number[]) => {
    setValues(newValues)
  }

  const handleCommit = (newValues: number[]) => {
    // You can perform actions on commit if needed
    // eslint-disable-next-line no-console
    console.log('Committed values:', newValues)
  }

  return <Ranger {...args} onChange={handleChange} onValueCommit={handleCommit} values={values} />
}

export const Default = Template.bind({})
Default.args = {
  values: [1, 100],
}
