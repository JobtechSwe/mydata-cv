import React, { Component } from 'react'
import { getConsent } from '../services/operator'
import Typography from '@material-ui/core/Typography'

export default class Connecting extends Component {
  async componentDidMount () {
    await this.getConsents()
  }

  getConsents = async () => {
    try {
      const consent = await getConsent(this.props.consent.links.self)
      this.props.onConsentApproved(consent)
    } catch (error) {
      this.props.onConsentRejected(error)
    }
  }

  render () {
    return <Typography component="h1" variant="h5">Connecting...</Typography>
  }
}
