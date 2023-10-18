import { Meta } from '@storybook/react'

import { Tab, TabContent } from './tab'

export default {
  args: {
    children: (
      <>
        <TabContent value={''}>Контент спринтов</TabContent>
        <TabContent value={'weeks'}>Контент недель</TabContent>
        <TabContent value={'subjects'}>Контент тем</TabContent>
      </>
    ),
    defaultValue: 'tik',
    tabs: [
      { title: 'tik', value: '' },
      { title: 'tok', value: 'tok' },
      { title: 'tak', value: 'tak' },
    ],
  },
  component: Tab,
  title: 'Components/Tabs',
} as Meta<typeof Tab>

export const Primary = {}

export const PrimaryWithDisabled = {
  args: {
    tabs: [
      { title: 'tik', value: 'tik' },
      { title: 'tok', value: 'tok' },
      { disabled: true, title: 'tak', value: 'tak' },
    ],
  },
}

export const FullWidth = {
  args: {
    fullWidth: true,
  },
}
