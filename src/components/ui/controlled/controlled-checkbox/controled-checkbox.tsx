import { UseControllerProps, useController } from 'react-hook-form'

import { UniversalCheckbox } from '@/components'

export type ControlledCheckboxProps = UseControllerProps<any> & {
  label?: string
}
// & Omit<CheckboxProps, "onChange" | "value" | "id">;

export const ControlledCheckbox = ({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: ControlledCheckboxProps) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <UniversalCheckbox
      {...{
        checked: value,
        id: name,
        onValueChange: onChange,
        ...checkboxProps,
      }}
    />
  )
}
