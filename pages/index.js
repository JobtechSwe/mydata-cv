import React from 'react'
import { Box, Typography, Button } from '@smooth-ui/core-sc'
import { createClient } from '@mydata/client'
import getConfig from 'next/config'

const { publicRuntimeConfig: { redirectUri, clientId, operatorUrl } } = getConfig()

const client = createClient({ clientId, redirectUri, operatorUrl })
const loginUrl = client.getLoginUrl(redirectUri)

export default () => {
  return (
    <Box ml="auto" mr="auto" mt={100} maxWidth={960}>
      <Typography variant="h1">
        CV-app
      </Typography>
      <p><em>CV-app</em> is a awesome app for editing your CV, using a MyData bucket</p>
      <Button variant="success" onClick={() => window.location.assign(loginUrl)}>Log in with Mydata</Button>
    </Box>
  )
}
