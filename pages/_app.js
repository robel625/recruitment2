import { SessionProvider } from "next-auth/react"
//import Layout from "../components/Layout"
import '../styles/globals.css'
import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { ThemeProvider as Theme } from "next-themes"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material//CssBaseline"
import theme from "../theme"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { RecoilRoot } from "recoil";
//import 'bootstrap/dist/css/bootstrap.css';

import { wrapper } from "../redux/store"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  // const theme = createTheme()

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Theme attribute="class">
      <ThemeProvider theme={theme} >
        <SessionProvider session={session}>
           <RecoilRoot>
               <ToastContainer />
               <Component {...pageProps} />
            </RecoilRoot>
        </SessionProvider>
        <CssBaseline />
      </ThemeProvider>
      </Theme>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default wrapper.withRedux(MyApp)
