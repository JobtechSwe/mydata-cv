import React, { Component } from 'react'
import { getConsent } from '../services/operator'

export default class Connecting extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    getConsent()
  }
  render () {
    return <div className="connectingMessage">Connecting...</div>
  }
}
