import React, { Component } from 'react'
import { Button, Box, Typography } from '@smooth-ui/core-sc'
import Router from 'next/router'

export default class ConnectDone extends Component {
  onClick = () => {
    Router.push({
      pathname: '/profile'
    })
  }

  render () {
    return <Box
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h5">
        Done
      </Typography>
      <p>
        This service is now connected with your MyData-account.
      </p>
      <Button onClick={this.onClick}>Ok, let's get started</Button>
    </Box>
  }
}
