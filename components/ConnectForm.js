import { Component } from 'react'
import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig: { operatorUrl } } = getConfig()


export default class ConnectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {value: '', error: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value, error: ''})
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (!this.state.value) {
      this.setState({
        error: 'Id cannot be empty'
      })
    } else {
      const result = await axios.post(`${operatorUrl}/consents`, {})
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input name="id" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" id="submit"/>
        <p className="error">{this.state.error}</p>
      </form>
    )
  }
}