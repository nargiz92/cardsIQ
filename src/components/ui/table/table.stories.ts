import type { Meta, StoryObj } from '@storybook/react'

import { Table } from '@/components'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Component/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
