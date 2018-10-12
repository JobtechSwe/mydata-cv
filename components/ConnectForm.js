import React, { Component } from 'react'
import { requestConsent } from '../services/operator'

export default class ConnectForm extends Component {
  constructor (props) {
    super(props)
    this.state = { value: '', error: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value, error: '' })
  }

  async handleSubmit (event) {
    event.preventDefault()
    if (!this.state.value) {
      this.setState({
        error: 'Id cannot be empty'
      })
    } else {
      try {
        const result = await requestConsent({ accountId: this.state.value })
        this.props.onConsentRequest(result.consentId)
      } catch (error) {
        this.setState({
          error: 'Could not request consent for this account id'
        })
      }
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input name="id" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" id="submit" />
        <p className="error">{this.state.error}</p>
      </form>
    )
  }
}
