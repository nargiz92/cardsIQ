import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Typography',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Typography',
    disabled: false,
    variant: 'secondary',
  },
}
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Typography',
    disabled: false,
    variant: 'tertiary',
  },
}
export const Link: Story = {
  args: {
    children: 'Tertiary Typography',
    disabled: false,
    variant: 'link',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Typography',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    variant: 'primary',
  },
}
