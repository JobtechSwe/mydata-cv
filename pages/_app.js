import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { init as initApm } from 'elastic-apm-js-base'
import { globalStyle, createGlobalStyle } from '@smooth-ui/core-sc'
import { StoreProvider } from '../services/StoreContext'
import { isInitialized, init } from '../services/operator'
import getConfig from 'next/config'

const GlobalStyle = createGlobalStyle`${globalStyle()}`

export default class MyDataCV extends App {
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

    if (!isInitialized()) {
      console.log('Initializing MyData-Operator')
      const { publicRuntimeConfig: { operatorUrl, redirectUri, clientId } } = getConfig()
      init({
        clientId,
        operatorUrl,
        redirectUri
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
          <StoreProvider>
            <Component {...pageProps} />
          </StoreProvider>
        </Container>
      </React.Fragment>
    )
  }
}
