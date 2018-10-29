import React from 'react'
import { Box, Typography, Button } from '@smooth-ui/core-sc'

export default ({ title }) => (
  <Box display="flex" alignItems="center">
    <Typography variant="h6">
      {title}
    </Typography>
    <Button variant="light" size="sm" mb={1} ml={2}>Edit</Button>
  </Box>
)
