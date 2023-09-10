// components/FormikDatePicker.tsx
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useField, useFormikContext } from 'formik'
import React from 'react'

type Props = {
  name: string
  label: string
} & Omit<DatePickerProps<Date>, 'onChange' | 'value'>

export const FormikDatePicker = (props: Props) => {
  const { name, ...restProps } = props
  const [field] = useField(name)
  const { setFieldValue } = useFormikContext()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...restProps}
        value={field.value ?? null}
        onChange={(val) => setFieldValue(name, val)}
      />
    </LocalizationProvider>
  )
}
