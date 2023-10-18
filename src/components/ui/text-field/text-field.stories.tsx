import type { ComponentStory, Meta } from '@storybook/react'

import { useState } from 'react'

import { TextField } from './text-field'

const meta = {
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['errorMessage'],
    },
  },
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/Textfield',
} satisfies Meta<typeof TextField>

export default meta

export const TextInput: ComponentStory<typeof TextField> = args => {
  // render: (args) => {
  const [value, setValue] = useState('')

  return <TextField {...args} onChange={e => setValue(e.currentTarget.value)} value={value} />
}
