import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@smooth-ui/core-sc'
import axios from 'axios'
import QRCode from 'qrcode.react'

let pollId

const poll = id => setInterval(async () => {
  try {
    await axios.get(`/api/approved/${id}`)
    clearInterval(pollId)
    window.location.assign('/profile')
  } catch (error) {
    console.log(error)
  }
}, 2000)

export default () => {
  const [id, setId] = useState(null)
  useEffect(() => {
    axios.post('/api/auth')
      .then(val => val.data.id)
      .then(id => {
        setId(id)
        pollId = poll(id)
      })
  }, [])

  return (
    <Box
      position="absolute"
      top={0}
      ml="auto"
      mr="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      {id && <Box textAlign="center">
        <Typography variant="h6">Enter the code for this consent request:</Typography>
        <Typography variant="h1">{id}</Typography>
        <QRCode value={id} />
      </Box>}
    </Box>
  )
}
