import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import type { Task } from '@prisma/client'
import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

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

export default function TaskDetails({ task }: Props) {
  return (
    <Box>
      <Formik
        initialValues={{ ...task, error: null }}
        onSubmit={(values, { setErrors, setSubmitting, resetForm }) => {
          console.log(values)
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
                Create
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </Box>
  )
}
