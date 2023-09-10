import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import type { Task } from '@prisma/client'
import { Form, Formik } from 'formik'
import { enqueueSnackbar } from 'notistack'
import React from 'react'
import * as Yup from 'yup'

import { trpc } from '@/utils/trpc'

import { FormikDatePicker } from './FormikDatePicker'

interface Props {
  task: Task
}

const taskCreateSchame = Yup.object({
  id: Yup.string(),
  title: Yup.string().required(),
  is_finish: Yup.boolean().required(),
  description: Yup.string(),
  end_date_scheduled: Yup.date().nullable(),
  end_date_actual: Yup.date().nullable(),
})

//

const taskDelereSchame = Yup.object({
  id: Yup.string().required(),
})

export default function TaskDetails({ task }: Props) {
  const create = trpc.taskRouter.create.useMutation()
  const update = trpc.taskRouter.update.useMutation()
  const taskdelete = trpc.taskRouter.delete.useMutation()

  return (
    <Box>
      <Formik
        initialValues={{ ...task, error: null }}
        onSubmit={(values, { setErrors, setSubmitting, resetForm }) => {
          if (task.id === '') {
            const ans = create.mutate(values, {
              onSuccess: () => {
                enqueueSnackbar('Task Created', { variant: 'success' })
                setSubmitting(false)
                resetForm({ values: values })
              },
              onError: () => {
                enqueueSnackbar('Task Create failed', { variant: 'error' })
                setSubmitting(false)
              },
            })
          } else {
            update.mutate(values, {
              onSuccess: () => {
                enqueueSnackbar('Task Updated', { variant: 'success' })
                setSubmitting(false)
                resetForm({ values: values })
              },
              onError: () => {
                enqueueSnackbar('Task Update failed', { variant: 'error' })
                setSubmitting(false)
              },
            })
          }
        }}
        validationSchema={taskCreateSchame}
      >
        {({
          handleSubmit,
          isSubmitting,
          errors,
          isValid,
          dirty,
          values,
          handleChange,
          handleBlur,
          touched,
        }) => (
          <>
            <Form
              className="ui form error"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <TextField
                margin={'normal'}
                fullWidth
                id="title"
                name="title"
                label="Title"
                type="text"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              <TextField
                margin={'normal'}
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={10}
                type="text"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <br />
              <FormikDatePicker
                name="end_date_scheduled"
                label="End Date Scheduled"
              />
              <br />
              <br />
              <FormikDatePicker
                name="end_date_actual"
                label="End Date Actual"
              />
              <br />
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    name="is_finish"
                    color="primary"
                    checked={values.is_finish}
                    onChange={handleChange}
                  />
                }
                label="Task Finished"
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid || !dirty || isSubmitting}
              >
                {task.id === '' ? 'Create' : 'Update'}
              </Button>
            </Form>
          </>
        )}
      </Formik>

      {task.id !== '' && (
        <Formik
          initialValues={{ ...task, error: null }}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            taskdelete.mutate(
              { id: task.id },
              {
                onSuccess: () => {
                  enqueueSnackbar('Task Deleted', { variant: 'success' })
                  setSubmitting(false)
                },
                onError: () => {
                  enqueueSnackbar('Task Delete failed', { variant: 'error' })
                  setSubmitting(false)
                },
              },
            )
          }}
          validationSchema={taskDelereSchame}
        >
          {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form
              className="ui form error"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <br />
              <Button
                type="submit"
                variant="contained"
                color="warning"
                disabled={!isValid || isSubmitting}
              >
                Delete
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  )
}
