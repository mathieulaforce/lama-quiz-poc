import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from "@mui/material";
import { defaultTheme } from '../theme/defaultTheme';
import Head from 'next/head';
import createEmotionCache from '../theme/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import "../styles/global.css"

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  return <CacheProvider value={emotionCache}>

    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
}
