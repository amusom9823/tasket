import {
  Checkbox,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { type Task } from '@prisma/client'
import dayjs from 'dayjs'

interface Props {
  tasks: Task[]
}

const TaskList = ({ tasks }: Props) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>タイトル</TableCell>
          <TableCell>完了状況</TableCell>
          <TableCell>計画日時</TableCell>
          <TableCell>完了日時</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {tasks.map((task, index) => {
          return (
            <TableRow key={task.id}>
              <TableCell>
                <Link>{index + 1}</Link>
              </TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Checkbox disabled={true} checked={task.is_finish} />
              </TableCell>
              <TableCell>
                {task.end_date_scheduled &&
                  getMonthDayTimeLocal(task.end_date_scheduled)}
              </TableCell>
              <TableCell>
                {task.end_date_actual &&
                  getMonthDayTimeLocal(task.end_date_actual)}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TaskList

function getMonthDayTimeLocal(date: Date): string {
  return dayjs(date).format('MM/DD HH:mm:ss')
}
