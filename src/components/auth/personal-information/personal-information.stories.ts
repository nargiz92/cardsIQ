import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInformation } from '@/components'

const meta: Meta<typeof PersonalInformation> = {
  component: PersonalInformation,
}

export default meta
type Story = StoryObj<typeof PersonalInformation>

export const Primary: Story = {}
