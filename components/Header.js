import React from 'react'
import { Box, Typography } from '@smooth-ui/core-sc'

export default ({ firstName, lastName, headline }) => (
  <Box display="flex" flexDirection="column" alignItems="center" mt={40}>
    <Box width={200} height={200} backgroundColor="light" />
    <Typography variant="h3" mt={20}>
      {firstName} {lastName}
    </Typography>
    <p>{headline}</p>
  </Box>
)
