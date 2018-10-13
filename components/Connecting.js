import React, { Component } from 'react'
import { getConsent } from '../services/operator'

export default class Connecting extends Component {
  async componentDidMount() {
    await this.getConsents()
  }

  getConsents = async () => {
    try {
      const consent = await getConsent(this.props.consent)
      this.props.onConsentApproved(consent)
    } catch (error) {
      this.props.onConsentRejected(error)
    }
  }

  render () {
    return <div className="connectingMessage">Connecting...</div>
  }
}
