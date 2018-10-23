import ConnectForm from '../components/ConnectForm'
import Connecting from '../components/Connecting'
import ConnectDone from '../components/ConnectDone'
import ConnectError from '../components/ConnectError'
import React, { Component } from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

const Page = styled.div`
  font-size: 2.5em;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
`

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '15px'
})

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
    let content
    if (this.state.mode === 'connect') content = <ConnectForm onConsentRequest={this.onConsentRequest} />
    if (this.state.mode === 'connecting') content = <Connecting consent={this.state.consent} onConsentRejected={this.onConsentRejected} onConsentApproved={this.onConsentApproved} />
    if (this.state.mode === 'done') content = <ConnectDone consent={this.state.consent} />
    if (this.state.mode === 'error') content = <ConnectError error={this.state.error} />

    return <Page>
      <StyledPaper>
        {content}
      </StyledPaper>
    </Page>
  }
}
