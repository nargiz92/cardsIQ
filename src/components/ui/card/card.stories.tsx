import { Card } from '@/components'
import { HomeIcon } from '@/styles/assets/icons/home-icon'
import { Meta } from '@storybook/react'

export default {
  component: Card,
  title: 'Components/Card',
} as Meta<typeof Card>

export const Primary = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    title: 'Some title',
  },
}

export const PrimaryWithIcon = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    iconComponent: <HomeIcon />,
    title: 'Some title',
  },
}

export const PrimaryWithoutTitle = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
}

export const Info = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    variant: 'info',
  },
}
