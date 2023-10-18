import { Meta, Story } from '@storybook/react'

import { Option, Selected } from './selected'

type Props = {
  className?: string
  defaultValue?: string

  disabled?: boolean
  label?: string
  onValueChange: (value: string) => void
  options: Option[]
  placeholder?: string
  required?: boolean
  value: string
  variant?: 'pagination' | 'secondary'
}
const options: Option[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

export default {
  component: Selected,
  title: 'Selected',
} as Meta

const Template: Story<Props> = args => <Selected {...args} />

export const Default: Story<Props> = Template.bind({})
Default.args = {
  label: 'Select an option',
  options,
  placeholder: 'Choose an option',
  value: 'option1',
}

export const WithDisabledState: Story<Props> = Template.bind({})
WithDisabledState.args = {
  disabled: true,
  label: 'Select an option (disabled)',
  options,
  placeholder: 'Choose an option',
  value: 'option1',
}

export const WithRequiredAttribute: Story<Props> = Template.bind({})
WithRequiredAttribute.args = {
  label: 'Select an option (required)',
  options,
  placeholder: 'Choose an option',
  required: true,
  value: 'option1',
}
