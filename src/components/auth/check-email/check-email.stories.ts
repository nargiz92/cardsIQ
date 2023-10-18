import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from '@/components'

const meta: Meta<typeof CheckEmail> = {
  component: CheckEmail,
}

export default meta
type Story = StoryObj<typeof CheckEmail>

export const Primary: Story = {}
