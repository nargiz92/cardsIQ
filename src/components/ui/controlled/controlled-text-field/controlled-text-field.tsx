import { FC, Ref } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components'

export type Props = UseControllerProps<any> &
  Omit<TextFieldProps, 'id' | 'onChange' | 'value'> & {
    ref?: Ref<HTMLInputElement>
  }
export const ControlledTextField: FC<Props> = ({
  control,
  name,
  rules,

  shouldUnregister,
  ...textFieldProps
}) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <TextField
      {...{
        id: name,
        onChange,
        value,
        ...textFieldProps,
      }}
    />
  )
}
