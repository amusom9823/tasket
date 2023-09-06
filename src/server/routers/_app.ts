import { router } from '../trpc'
import { helloRouter } from './helloRouter'
import { registerRouter } from './registerRouter'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  helloRouter,
  registerRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
