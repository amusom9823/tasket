import type { EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps, AppType } from 'next/app'
import { SnackbarProvider } from 'notistack'

import Layout from '@/components/layout/layout'
import createEmotionCache from '@/createEmotionCache'
import { trpc } from '@/utils/trpc'

import theme from '../theme'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default trpc.withTRPC(MyApp)
