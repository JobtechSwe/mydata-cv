import React, { Component } from 'react'
import { requestConsent } from '../services/operator'
import styled from 'styled-components'
import { Button, FormGroup, Label, Input, ControlFeedback, Typography } from '@smooth-ui/core-sc'
import { storeId } from '../services/storage'

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
        storeId(this.state.value)
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
          variant="h5"
        >
          Connect to MyData
        </Typography>
        <FormGroup>
          <Label htmlFor="account-id">MyData ID</Label>
          <Input
            type="text"
            control id="account-id"
            onChange={this.handleChange}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            value={this.state.value}
          />
          <ControlFeedback valid={!this.state.error}>{this.state.error}</ControlFeedback>
        </FormGroup>
        <Button
          type="submit"
          id="submit"
          variant="primary"
          width="100%"
        >
            OK
        </Button>
      </Form>
    )
  }
}
