import ConnectForm from '../components/ConnectForm'
import Connecting from '../components/Connecting'
import ConnectDone from '../components/ConnectDone'
import ConnectError from '../components/ConnectError'
import React, { Component } from 'react'

export default class ConnectPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 'connect'
    }
  }

  onConsentRequest (consentId) {
    this.setState({
      mode: 'connecting',
      consentId
    })
  }

  render () {
    if (this.state.mode === 'connect') return <ConnectForm onConsentRequest={this.onConsentRequest} />
    if (this.state.mode === 'connecting') return <Connecting consentId={this.state.consentId} />
    if (this.state.mode === 'done') return <ConnectDone />
    if (this.state.mode === 'error') return <ConnectError />
  }
}
