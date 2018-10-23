import React, { Component } from 'react'
import { requestConsent } from '../services/operator'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const Form = styled.form`
  width: 100%;
`

export default class ConnectForm extends Component {
  state = { value: '', error: '' }

  handleChange = (event) => {
    this.setState({ value: event.target.value, error: '' })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    if (!this.state.value) {
      this.setState({
        error: 'Id cannot be empty'
      })
    } else {
      try {
        const { data, links } = await requestConsent(this.state.value)
        this.props.onConsentRequest({ data, links })
      } catch (error) {
        this.setState({
          error: 'Could not request consent for this account id'
        })
      }
    }
  }

  render () {
    return (
      <Form
        onSubmit={this.handleSubmit}
        name="form"
      >
        <Typography
          component="h1"
          variant="h5"
        >
          Connect to MyData
        </Typography>
        <TextField
          label="MyData ID"
          name="id"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          helperText={this.state.error}
          error={!!this.state.error}
          autoFocus
        />
        <Button
          type="submit"
          id="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
            OK
        </Button>
      </Form>
    )
  }
}
