import { Box, Button, Container, Grid, Typography } from '@mui/material'
import type { Task } from '@prisma/client'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'

import TaskDetails from '@/components/task/taskdetails'
import TaskList from '@/components/task/tasklist'
import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

const defaultTask = (): Task => {
  return {
    id: '',
    title: '',
    is_finish: true,
    description: '',
    end_date_scheduled: null,
    end_date_actual: null,
  }
}

export default function Home() {
  const { data: session } = useSession()

  const router = useRouter()
  const { id } = router.query // id is a string

  const tasks = trpc.taskRouter.list.useQuery()

  const gettask = (id: string | string[] | undefined) => {
    if (tasks.data) {
      const ans = tasks.data.tasks.find((task) => task.id === id?.toString())
      if (ans) {
        return ans
      } else {
        return defaultTask()
      }
    } else {
      return defaultTask()
    }
  }

  return (
    <Container maxWidth={false}>
      <Box p={10}>
        {session ? (
          tasks.data ? (
            <Grid container spacing={10}>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Task List
                </Typography>
                <TaskList tasks={tasks.data.tasks} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Task Detail and Edit
                </Typography>
                {gettask(id) && <TaskDetails task={gettask(id)} />}
              </Grid>
            </Grid>
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Welcome to Tasket
            </Typography>
            <Button onClick={() => signIn()}>Login</Button>
          </>
        )}
      </Box>
    </Container>
  )
}
