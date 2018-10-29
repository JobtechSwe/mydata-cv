import ConnectForm from '../components/ConnectForm'
import Connecting from '../components/Connecting'
import ConnectDone from '../components/ConnectDone'
import ConnectError from '../components/ConnectError'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Box } from '@smooth-ui/core-sc'

const Page = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
`

export default class ConnectPage extends Component {
  state = {
    mode: 'connect'
  }

  onConsentRequest = (consent) => {
    this.setState({
      mode: 'connecting',
      consent: consent
    })
  }

  onConsentApproved = (consent) => {
    this.setState({
      mode: 'done',
      consent: consent
    })
  }

  onConsentRejected = (error) => {
    this.setState({
      mode: 'error',
      error
    })
  }

  render () {
    return <Page>
      <Box>
        {this.state.mode === 'connect' && <ConnectForm onConsentRequest={this.onConsentRequest} />}
        {this.state.mode === 'connecting' && <Connecting
          consent={this.state.consent}
          onConsentRejected={this.onConsentRejected}
          onConsentApproved={this.onConsentApproved}
        />}
        {this.state.mode === 'done' && <ConnectDone consent={this.state.consent} />}
        {this.state.mode === 'error' && <ConnectError error={this.state.error} />}
      </Box>
    </Page>
  }
}
