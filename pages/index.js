import React from 'react'
import { Box, Typography, Button, theme } from '@smooth-ui/core-sc'
import { createClient } from '@mydata/client'
import getConfig from 'next/config'

const { publicRuntimeConfig: { redirectUri, clientId, operatorUrl } } = getConfig()

const client = createClient({ clientId, redirectUri, operatorUrl })
const loginUrl = client.getLoginUrl(redirectUri)

export default () => {
  return (
    <React.Fragment>
      <div style={{ backgroundImage: "url('/static/photo.jpg')", height: 100 + 'vh', position: 'absolute', top: 0, width: 100 + 'vw', zIndex: -10 }} />
      <Box
        ml={100 + 'px'}
        mr="auto" maxWidth={550}
        style={{ backgroundColor: 'white', boxShadow: '3px 3px 7px 7px rgba(0,0,0,0.1)', padding: 50 + 'px', marginTop: 50 + 'px', borderRadius: 2 + 'px' }}>
        <Typography variant="h1">
          C:V - Manage your <span style={{ color: theme.brick }}>Curriculum Vitae</span> online
        </Typography>
        <p>Integrates with MyData - you have complete control</p>
        <ul style={{ listStyleType: 'circle' }}>
          <li>Create, view and edit your CV in a convenient editor</li>
          <li>Choose among dozens of themes and layouts</li>
          <li>Build upon other existing data sources</li>
          <li>Share your CV with whoever you want</li>
          <li>And more</li>
        </ul>
        <Button variant="success" onClick={() => window.location.assign(loginUrl)}>Log in with Mydata</Button>
      </Box>
    </React.Fragment>
  )
}
