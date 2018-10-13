import ConnectForm from '../components/ConnectForm'
import Connecting from '../components/Connecting'
import ConnectDone from '../components/ConnectDone'
import ConnectError from '../components/ConnectError'
import React, { Component } from 'react'

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
    if (this.state.mode === 'connect') return <ConnectForm onConsentRequest={this.onConsentRequest} />
    if (this.state.mode === 'connecting') return <Connecting consent={this.state.consent} onConsentRejected={this.onConsentRejected} onConsentApproved={this.onConsentApproved}/>
    if (this.state.mode === 'done') return <ConnectDone consent={this.state.consent} />
    if (this.state.mode === 'error') return <ConnectError error={this.state.error} />
  }
}
