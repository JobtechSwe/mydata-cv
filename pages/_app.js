import React from 'react'
import App, { Container } from 'next/app'
import { init as initApm } from 'elastic-apm-js-base'

export default class MyDataCV extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Container.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount() {
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

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}