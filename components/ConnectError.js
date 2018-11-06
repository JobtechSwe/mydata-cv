import React, { Component } from 'react'
import { clearId } from '../services/storage'

export default class ConnectError extends Component {
  render () {
    clearId()

    return <div>Error</div>
  }
}
