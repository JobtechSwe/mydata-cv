import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import { init as initApm } from 'elastic-apm-js-base'
import { globalStyle, createGlobalStyle } from '@smooth-ui/core-sc'
import { getUser } from '../services/user'

const GlobalStyle = createGlobalStyle`${globalStyle()}`

export default class MyDataCV extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    // TODO: Is this right?
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  async componentDidMount () {
    const apm = initApm({

      // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
      serviceName: 'mydata-cv',

      // Set custom APM Server URL (default: http://localhost:8200)
      serverUrl: 'http://localhost:8200',

      // Set service version (required for sourcemap feature)
      serviceVersion: ''
    })
    apm.setInitialPageLoadName(window.location.href)

    const user = await getUser()

    if (!user && Router.pathname !== '/') {
      Router.push({
        pathname: '/connect'
      })
    }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
        <GlobalStyle />
        <Head>
          <title>CV</title>
        </Head>
        <Container>
          <Component {...pageProps} />
        </Container>
      </React.Fragment>
    )
  }
}
