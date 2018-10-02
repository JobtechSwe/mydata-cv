import ConnectForm from '../components/ConnectForm'
import Connecting from '../components/Connecting'
import ConnectDone from '../components/ConnectDone'
import ConnectError from '../components/ConnectError'
import { Component } from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export default class ConnectPage extends Component {
  render() {
    return (
      <div>
        <ConnectForm />
        <Connecting />
        <ConnectDone />
        <ConnectError />
      </div>
    )
  }
}