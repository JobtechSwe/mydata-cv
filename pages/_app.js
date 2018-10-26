import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { init as initApm } from 'elastic-apm-js-base'
import { globalStyle, createGlobalStyle } from '@smooth-ui/core-sc'

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

  componentDidMount () {
    const apm = initApm({

      // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
      serviceName: 'mydata-cv',

      // Set custom APM Server URL (default: http://localhost:8200)
      serverUrl: 'http://localhost:8200',

      // Set service version (required for sourcemap feature)
      serviceVersion: ''
    })
    apm.setInitialPageLoadName(window.location.href)
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
