import { Box, Button, Container, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { trpc } from '@/utils/trpc'

export default function RegisterForm() {
  const create = trpc.registerRouter.create.useMutation()

  return (
    <Container maxWidth="xs">
      <Box>
        <Formik
          initialValues={{ username: '', email: '', password: '', error: null }}
          onSubmit={(values, { setErrors }) => {
            console.log(values)
            create.mutate(values, {
              onSuccess: (data) => {
                console.log('Register Success:', data)
              },
              onError: (error) => {
                console.log('Register error:', error)
              },
            })
          }}
          validationSchema={Yup.object({
            username: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
          })}
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
            <Form
              className="ui form error"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <h3>Register</h3>

              <TextField
                margin={'normal'}
                fullWidth={true}
                id="username"
                name="username"
                label="User Name"
                type="text"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />

              <TextField
                margin={'normal'}
                fullWidth={true}
                id="email"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                margin={'normal'}
                fullWidth={true}
                id="password"
                name="password"
                label="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  )
}
