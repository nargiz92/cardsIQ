import { useState } from 'react'

import { Meta } from '@storybook/react'

import { CheckboxProps, UniversalCheckbox } from './checkbox'

export default {
  component: UniversalCheckbox,
  title: 'Components/UniversalCheckbox',
} as Meta<typeof UniversalCheckbox>

export const Default = {
  args: {
    disabled: false,
    label: 'Click ',
  },

  render: (args: CheckboxProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(true)

    return (
      <div>
        <UniversalCheckbox {...args} checked={checked} onValueChange={setChecked} />
        <div>checked :{String(checked)}</div>
      </div>
    )
  },
}
