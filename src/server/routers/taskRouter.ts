import { z } from 'zod'

import { procedure, router } from '../trpc'

export const taskRouter = router({
  list: procedure.query(async (opts) => {
    if (opts.ctx.session) {
      const tasks = await opts.ctx.prisma.task.findMany()

      return {
        tasks: tasks,
      }
    }
  }),

  create: procedure
    .input(
      z.object({
        title: z.string(),
        is_finish: z.boolean(),
        description: z.string().nullable(),
        end_date_scheduled: z.date().nullable(),
        end_date_actual: z.date().nullable(),
      }),
    )
    .mutation(async (opt) => {
      // セッション情報を取得し、存在する場合のみ登録を実行する
      if (opt.ctx.session) {
        const newTask = await opt.ctx.prisma.task.create({
          data: {
            title: opt.input.title,
            is_finish: opt.input.is_finish,
            description: opt.input.description,
            end_date_scheduled: opt.input.end_date_scheduled,
            end_date_actual: opt.input.end_date_actual,
          },
        })

        return newTask //追加されたタスクの内容を返す
      }
    }),
})
