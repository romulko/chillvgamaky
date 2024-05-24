import type {AppProps} from 'next/app';
import {GoogleAnalytics, usePageViews} from 'nextjs-google-analytics';
import Head from 'next/head';
import {
    createGlobalStyle,
    DefaultTheme,
    ThemeProvider,
} from 'styled-components';
import {SessionProvider} from 'next-auth/react';
import {RecoilRoot} from 'recoil';

const theme: DefaultTheme = {
    colors: {
        primary: '#111',
        secondary: '#0070f3',
    },
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: 'Roboto', sans-serif;
    font-size: 18px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  li {
    list-style-type: none;
  }

  #__next {
    width: 100%;
    max-width: 600px;

    //padding: 0 20px;
  }
`;

export default function App({
    Component,
    pageProps: {session, ...pageProps},
}: AppProps) {
    usePageViews();

    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <SessionProvider session={session}>
                    <GlobalStyle />
                    <GoogleAnalytics />

                    <Head>
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, minimum-scale=1"
                        />
                    </Head>

                    <Component {...pageProps} />
                </SessionProvider>
            </ThemeProvider>
        </RecoilRoot>
    );
}

/*
incoming request

nextjs process Order first - it grabs Order component and call Order.getServerSideProps

It then calls App(Order, Order.getServerSideProps)

 */
