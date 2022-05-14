import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
export default function App({ Component, 
  pageProps: {session, ...pageProps}
}) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'dark',
          }}
        >
          <SessionProvider session={session}>
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          </SessionProvider>
        </MantineProvider>
    </>
  );
}