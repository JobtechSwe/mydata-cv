import ConnectForm from '../components/ConnectForm'
import Connecting from '../components/Connecting'
import ConnectDone from '../components/ConnectDone'
import ConnectError from '../components/ConnectError'
import { Component } from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export default class ConnectPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'connect'
    }
  }

  render() {
    if(this.state.mode === 'connect') return <ConnectForm />
    if(this.state.mode === 'connecting') return <Connecting />
    if(this.state.mode === 'done') return <ConnectDone />
    if(this.state.mode === 'error')  return <ConnectError />
  }
}