import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './typography'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'body1',
        'h1',
        'h2',
        'h3',
        'large',
        'body2',
        'subtitle1',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Body1: Story = {
  args: {
    children: 'length must be more 10',
    color: 'inherit',
    variant: 'body1',
  },
}
export const Body2: Story = {
  args: {
    children: 'length must be more 10',
    color: 'inherit',
    variant: 'body2',
  },
}

export const H1: Story = {
  args: {
    children: 'Secondary Typography',
    color: 'secondary',
    variant: 'h1',
  },
}
export const H2: Story = {
  args: {
    children: 'Tertiary Typography',
    color: 'secondary',
    variant: 'h2',
  },
}
export const H3: Story = {
  args: {
    children: 'Tertiary Typography',
    color: 'secondary',
    variant: 'h3',
  },
}
export const Large: Story = {
  args: {
    children: 'Tertiary Typography',
    color: 'secondary',
    variant: 'large',
  },
}
export const Subtitle1: Story = {
  args: {
    children: 'Tertiary Typography',
    color: 'secondary',
    variant: 'subtitle1',
  },
}
export const Subtitle2: Story = {
  args: {
    children: 'Full Width Typography',
    color: 'secondary',
    variant: 'subtitle2',
  },
}
export const Caption: Story = {
  args: {
    children: 'Full Width Typography',
    color: 'secondary',
    variant: 'caption',
  },
}
export const Overline: Story = {
  args: {
    children: 'Full Width Typography',
    color: 'secondary',
    variant: 'overline',
  },
}

export const Link1: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    color: 'primary',
    variant: 'link1',
  },
}
export const Link2: Story = {
  args: {
    children: 'Full Width Typography',
    color: 'primary',
    variant: 'link2',
  },
}
